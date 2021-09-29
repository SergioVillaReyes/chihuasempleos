import React from 'react';
import { Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope , faLaptop, faFileWord} from '@fortawesome/free-solid-svg-icons';
import LoginEmpresas from '../../components/LoginEmpresas/LoginEmpresas';

import './publicar-mis-vacantes.scss';

export default function PublicarMisVacantes(){

return (

    <Container>
        <Col>
            <Row>
<CardGroup>
  <Card>
    <Card.Body>
      <Card.Title><FontAwesomeIcon icon={faEnvelope} /></Card.Title>
      <Card.Text>
        <h2>
      Regístrate gratis
        </h2>
        
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Regístrate con un simple paso, anote tu nombre de empresa, correo y password y empieza a gestionar tus vacantes.</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Body>
      <Card.Title><FontAwesomeIcon icon={faLaptop} /></Card.Title>
      <Card.Text>
        <h2>
      Publica tus vacantes
        </h2>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Crea, edita y elimina tus vacantes como mejor te convenga! Tendras total control.</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Body>
      <Card.Title><FontAwesomeIcon icon={faFileWord} /></Card.Title>
      <Card.Text>
        <h2>
      Recibe Curriculums
        </h2>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Gestiona los Curriculums que recibas a través de filtros que te ayudaran a facilitar tus tareas de búsqueda.</small>
    </Card.Footer>
  </Card>
</CardGroup>

            </Row>

            <LoginEmpresas/>
            
        </Col>
    </Container>

);

}