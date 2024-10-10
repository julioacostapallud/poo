const express = require('express');
const WebSocket = require('ws');
const os = require('os');  // Para obtener la IP privada
const wifi = require('node-wifi');  // Módulo para obtener la red WiFi
const app = express();
const PORT = 3001;

app.use(express.static('public'));

// Inicializar el módulo de WiFi
wifi.init({
    iface: null // Por defecto detecta la interfaz correcta
});

// Función para obtener la IP privada de la LAN
const getLocalIPAddress = () => {
    const interfaces = os.networkInterfaces();
    let ipAddress = '127.0.0.1';

    for (const [name, iface] of Object.entries(interfaces)) {
        if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wlan')) { // Filtrar por interfaz WiFi
            for (const details of iface) {
                if (details.family === 'IPv4' && !details.internal) {
                    ipAddress = details.address;  // Obtener IP de la interfaz WiFi
                    break;
                }
            }
        }
    }

    return ipAddress;
};

// Función para obtener el nombre de la red WiFi
const getWifiName = async () => {
    try {
        const currentConnections = await wifi.getCurrentConnections();
        // console.log(currentConnections);

        if (currentConnections.length > 0) {
            return currentConnections[0].bssid;  // Nombre de la red WiFi
        } else {
            return 'No conectado a ninguna red WiFi';
        }
    } catch (error) {
        // console.error('Error obteniendo la red WiFi:', error);
        return 'Error obteniendo la red WiFi';
    }
};

// Crear el servidor WebSocket
const server = app.listen(PORT, () => console.log(`Servidor corriendo en http://${getLocalIPAddress()}:${PORT}`));
const wss = new WebSocket.Server({ server });  // Mover la declaración de wss aquí

// Almacenar el estado del presentador
let overrideEnabled = false;

wss.on('connection', (ws) => {
    // Función para enviar los datos iniciales al cliente
    const sendInitialData = async () => {
        const wifiName = await getWifiName();  // Obtenemos el nombre de la red WiFi de forma asíncrona
        const ipAddress = getLocalIPAddress();  // Obtenemos la IP local

        // Enviamos los datos iniciales (overrideEnabled, ipAddress, wifiName) al cliente
        ws.send(JSON.stringify({ overrideEnabled, ipAddress, wifiName }));
    };

    sendInitialData();  // Llamamos a la función para enviar los datos

    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        if (data.type === 'toggleOverride') {
            overrideEnabled = data.overrideEnabled;
            const wifiName = await getWifiName();  // Obtenemos la red WiFi nuevamente
            const ipAddress = getLocalIPAddress();  // Obtenemos la IP local

            // Enviar el estado completo a todos los clientes conectados
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ overrideEnabled, ipAddress, wifiName }));
                }
            });
        }
    });
});
