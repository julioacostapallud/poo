import React, { useEffect, useState } from 'react';
import './styles/App.css';
import ControlPanel from './components/ControlPanel';
import DisplayIP from './components/DisplayIP';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons/faXmarkCircle';

let ws;

function App() {
  const [isPresenter, setIsPresenter] = useState(false);
  const [overrideEnabled, setOverrideEnabled] = useState(false);
  const [serverIPAddress, setServerIPAddress] = useState('');

  useEffect(() => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    setIsPresenter(pathname.includes('presentador'));
    ws = new WebSocket(`ws://${hostname}:3001`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.overrideEnabled !== undefined) {
        setOverrideEnabled(data.overrideEnabled);
      }
      if (data.ipAddress) {
        setServerIPAddress(data.ipAddress);
      }
    };
  }, []);

  const handleOverrideMethods = () => {
    const newOverrideEnabled = !overrideEnabled;
    setOverrideEnabled(newOverrideEnabled);
    ws.send(JSON.stringify({ type: 'toggleOverride', overrideEnabled: newOverrideEnabled }));
  };

  return (
    <div className="App">
      <Row className="header-bar d-flex justify-content-between border">
        <Col className="text-start">
          <h4>Paradigmas de Programación</h4>
          <h4 className="highlight-text">POO</h4>
        </Col>
        <Col className="text-end">
          <Row>
            <h4 className="highlight-text-blue">* Redefinición de métodos</h4>
            <h4 className="highlight-text-red">* Abstracción</h4>
          </Row>
        </Col>
      </Row>
      {isPresenter ? (
        <div>
          <Row className="mt-3">
            <Row>
              <button className="override-btn" onClick={handleOverrideMethods}>
                {overrideEnabled ? 'Desactivar Redefinición' : 'Permitir Redefinición de Métodos'}
              </button>
            </Row>
            <Row className="status-badge mt-2 fs-3">
              {overrideEnabled ? (
                <span className="badge success-badge text-success">REDEFINICION DE METODOS HABILITADA <FontAwesomeIcon icon={faCheckCircle} color="green" /></span>
              ) : (
                <span className="badge danger-badge text-danger">REDEFINICION DE METODOS DESHABILITADA <FontAwesomeIcon icon={faXmarkCircle} color="red" /></span>
              )}
            </Row>
            <Row>
              <DisplayIP ipAddress={serverIPAddress} icon={<FontAwesomeIcon icon={faWifi} />} />
            </Row>
          </Row>
        </div>
      ) : (
        <div>
          <ControlPanel overrideEnabled={overrideEnabled} />
        </div>
      )}
    </div>
  );
}

export default App;
