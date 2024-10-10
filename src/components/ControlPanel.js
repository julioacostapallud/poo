import React, { useState } from 'react';
import Perro from './Perro';
import Gato from './Gato';
import Vaca from './Vaca';
import Rana from './Rana';
import Pato from './Pato';
import Gallo from './Gallo';
import Animal from './Animal';
import { Card, Row, Col, Button, Input, Label, FormGroup, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle';

import 'bootstrap/dist/css/bootstrap.min.css';

// Iconos en blanco y negro
import perroIcon from '../icons/dog.png';
import gatoIcon from '../icons/cat.png';
import vacaIcon from '../icons/cow.png';
import ranaIcon from '../icons/frog.png';
import patoIcon from '../icons/duck.png';
import galloIcon from '../icons/rooster.png';

// Iconos en color
import perroColorIcon from '../icons/dogColor.png';
import gatoColorIcon from '../icons/catColor.png';
import vacaColorIcon from '../icons/cowColor.png';
import ranaColorIcon from '../icons/frogColor.png';
import patoColorIcon from '../icons/duckColor.png';
import galloColorIcon from '../icons/roosterColor.png';

// Generar un fondo dinámico interactivo
const generateBackground = () => {
    const gradients = [
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    ];
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
};

const ControlPanel = ({ overrideEnabled }) => {
    const [selectedAnimalType, setSelectedAnimalType] = useState(null);
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [background1, setBackground1] = useState('');
    const [background2, setBackground2] = useState('');
    const [background3, setBackground3] = useState('');
    const [background4, setBackground4] = useState('');
    const [background5, setBackground5] = useState('');
    const [background6, setBackground6] = useState('');

    const handleAnimalSelection = (animalType) => {
        setSelectedAnimalType(animalType);
    };

    const CrearInstancia = () => {
        let animal;
        switch (selectedAnimalType) {
            case 'Perro':
                animal = new Perro(nombre, fechaNacimiento, overrideEnabled);
                break;
            case 'Gato':
                animal = new Gato(nombre, fechaNacimiento, overrideEnabled);
                break;
            case 'Vaca':
                animal = new Vaca(nombre, fechaNacimiento, overrideEnabled);
                break;
            case 'Rana':
                animal = new Rana(nombre, fechaNacimiento, overrideEnabled);
                break;
            case 'Pato':
                animal = new Pato(nombre, fechaNacimiento, overrideEnabled);
                break;
            case 'Gallo':
                animal = new Gallo(nombre, fechaNacimiento, overrideEnabled);
                break;
            default:
                animal = new Animal(nombre, fechaNacimiento);
                break;
        }
        return animal;
    };

    const handleCreateAnimal = () => {
        if (nombre && fechaNacimiento) {
            setSelectedAnimal(CrearInstancia());
        } else {
            alert("Todos los campos son obligatorios.");
        }
    };

    const handleHacerSonido = () => {
        CrearInstancia().hacerSonido();
    };

    return (
        <div style={{ fontFamily: 'Aharoni, sans-serif' }}>
            <Row className="status-badge mt-2 fs-3">
                {overrideEnabled ? (
                    <span className="badge success-badge text-success">REDEFINICION DE METODOS HABILITADA <FontAwesomeIcon icon={faCheckCircle} color="green" /></span>
                ) : (
                    <span className="badge danger-badge text-danger">REDEFINICION DE METODOS DESHABILITADA <FontAwesomeIcon icon={faXmarkCircle} color="red" /></span>
                )}
            </Row>

            {/* Selección del animal */}
            {!selectedAnimalType && !selectedAnimal ? (
                <Row style={{ justifyContent: 'center', padding: '5px' }} className="gy-3">
                    <h4>Creación de instancia</h4>
                    <h6>Seleccione subclase</h6>
                    <Col xs={6} md={3} className="d-flex justify-content-center">
                        <Card
                            style={{ width: '100%', background: background1, padding: '10px', cursor: 'pointer' }}
                            onClick={() => handleAnimalSelection('Perro')}
                            onMouseEnter={() => setBackground1(generateBackground())}
                            onMouseLeave={() => setBackground1('')}
                        >
                            <Row style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
                                <img src={perroIcon} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="Perro" />
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>Perro</Row>
                        </Card>
                    </Col>

                    <Col xs={6} md={3} className="d-flex justify-content-center">
                        <Card
                            style={{ width: '100%', background: background2, padding: '10px', cursor: 'pointer' }}
                            onClick={() => handleAnimalSelection('Gato')}
                            onMouseEnter={() => setBackground2(generateBackground())}
                            onMouseLeave={() => setBackground2('')}
                        >
                            <Row style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
                                <img src={gatoIcon} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="Gato" />
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>Gato</Row>
                        </Card>
                    </Col>

                    <Col xs={6} md={3} className="d-flex justify-content-center">
                        <Card
                            style={{ width: '100%', background: background3, padding: '10px', cursor: 'pointer' }}
                            onClick={() => handleAnimalSelection('Vaca')}
                            onMouseEnter={() => setBackground3(generateBackground())}
                            onMouseLeave={() => setBackground3('')}
                        >
                            <Row style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
                                <img src={vacaIcon} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="Vaca" />
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>Vaca</Row>
                        </Card>
                    </Col>

                    <Col xs={6} md={3} className="d-flex justify-content-center">
                        <Card
                            style={{ width: '100%', background: background4, padding: '10px', cursor: 'pointer' }}
                            onClick={() => handleAnimalSelection('Rana')}
                            onMouseEnter={() => setBackground4(generateBackground())}
                            onMouseLeave={() => setBackground4('')}
                        >
                            <Row style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
                                <img src={ranaIcon} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="Rana" />
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>Rana</Row>
                        </Card>
                    </Col>

                    <Col xs={6} md={3} className="d-flex justify-content-center">
                        <Card
                            style={{ width: '100%', background: background5, padding: '10px', cursor: 'pointer' }}
                            onClick={() => handleAnimalSelection('Pato')}
                            onMouseEnter={() => setBackground5(generateBackground())}
                            onMouseLeave={() => setBackground5('')}
                        >
                            <Row style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
                                <img src={patoIcon} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="Pato" />
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>Pato</Row>
                        </Card>
                    </Col>

                    <Col xs={6} md={3} className="d-flex justify-content-center">
                        <Card
                            style={{ width: '100%', background: background6, padding: '10px', cursor: 'pointer' }}
                            onClick={() => handleAnimalSelection('Gallo')}
                            onMouseEnter={() => setBackground6(generateBackground())}
                            onMouseLeave={() => setBackground6('')}
                        >
                            <Row style={{ justifyContent: 'center', textAlign: 'center', marginTop: '10px' }}>
                                <img src={galloIcon} style={{ width: '100px', height: '100px', objectFit: 'contain' }} alt="Gallo" />
                            </Row>
                            <Row style={{ justifyContent: 'center', textAlign: 'center' }}>Gallo</Row>
                        </Card>
                    </Col>
                </Row>
            ) : null}

            {/* Formulario de atributos del animal */}
            {selectedAnimalType && !selectedAnimal ? (
                <div>
                    <h4>Creación de instancia</h4>
                    <Row>
                        <h6>Ingrese Atributos para su instancia de la clase {selectedAnimalType}</h6>
                    </Row>
                    <Form>
                        <FormGroup row>
                            <Label for="nombre" md={4}>Nombre</Label>
                            <Col md={8}>
                                <Input
                                    type="text"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="fechaNacimiento" md={4}>Fecha de Nacimiento</Label>
                            <Col md={8}>
                                <Input
                                    type="date"
                                    id="fechaNacimiento"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    required
                                />
                            </Col>
                        </FormGroup>

                        <Button color="dark" onClick={handleCreateAnimal}>
                            Crear {selectedAnimalType}
                        </Button>
                    </Form>
                </div>
            ) : null}

            {/* Tarjeta del animal creado */}
            {selectedAnimal ? (
                <>
                    <h4>Objeto creado</h4>

                    <div
                        className="selected-animal-card"
                        style={{
                            border: '2px solid #666666',
                            padding: '20px',
                            borderRadius: '10px',
                            backgroundColor: '#e6e6e6',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '20px auto',
                            textAlign: 'center',
                            color: '#333',
                            background: generateBackground(),
                        }}
                    >
                        <Row className="d-flex justify-content-between">
                            <Col className="text-start">
                                <h4 style={{ color: '#333333' }}>Animal</h4>
                                <h6>SUPERCLASE</h6>
                            </Col>
                            <Col className="text-end">
                                <Row>
                                    <h4 style={{ color: '#333333' }}>{selectedAnimalType}</h4>
                                    <h6>SUBCLASE</h6>
                                </Row>
                            </Col>
                        </Row>

                        <h3 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Nombre: <span style={{ color: '#333333' }}>{nombre}</span>
                        </h3>
                        <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Fecha de Nacimiento: <span style={{ color: '#666666' }}>{fechaNacimiento}</span>
                        </p>

                        <img
                            src={
                                selectedAnimalType === 'Perro'
                                    ? perroColorIcon
                                    : selectedAnimalType === 'Gato'
                                        ? gatoColorIcon
                                        : selectedAnimalType === 'Vaca'
                                            ? vacaColorIcon
                                            : selectedAnimalType === 'Rana'
                                                ? ranaColorIcon
                                                : selectedAnimalType === 'Pato' ?
                                                    patoColorIcon
                                                    : galloColorIcon
                            }
                            width="150"
                            height="150"
                            alt={selectedAnimalType}
                            style={{ marginTop: '10px' }}
                        />
                        <Row>
                            <button
                                onClick={handleHacerSonido}
                                style={{
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    backgroundColor: '#333333',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#666666')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#333333')}
                            >
                                Hacer Sonido
                            </button>
                        </Row>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ControlPanel;

