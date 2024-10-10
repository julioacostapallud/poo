import React, { useState, useEffect } from 'react';

const DisplayIP = ({ icon }) => {
    const [ipAddress, setIpAddress] = useState('');
    const [wifiName, setWifiName] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001');
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setIpAddress(data.ipAddress);
            setWifiName(data.wifiName || 'Desconocida');
        };
        return () => socket.close();
    }, []);

    useEffect(() => {
        if (ipAddress) {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://${ipAddress}:3000`;
            setQrCodeUrl(qrUrl);
        }
    }, [ipAddress]);

    return (
        <div className="display-ip">
            <h3>Escanea este código QR para conectarte</h3>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" style={{ width: '400px', height: '400px' }} />}
            <h3>{icon} Red: {wifiName}</h3>
        </div>
    );
};

export default DisplayIP;
