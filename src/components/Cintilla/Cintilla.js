import React, {useState} from "react";
import { Container, Row, Col, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons' ;
import { faBuilding, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import ModalSesion from "../ModalSesion/ModalSesion";
import { url } from '../../utils/constans';


import './Cintilla.scss';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

const sessionUser = sessionStorage.getItem("sessionUsuarios");
const sessionUsuarios = JSON.parse(sessionUser);

export default function Cintilla(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cerrarSession=()=>{

        sessionStorage.clear();

        window.location = url;

    }


    return (
<div className="cintilla">
<Container>
  <Row>
    <Col>


    <Nav defaultActiveKey="/" as="ul" className="navigator">
        <Nav.Item as="li">
            <Nav.Link href="https://www.facebook.com/Chihuas-Empleos-1052506421806253/" target="_link"> <FontAwesomeIcon icon={faFacebookF} /> Siguenos en la Red Social</Nav.Link>
        </Nav.Item>

        {!sessionEmpresas ? (
        <Nav.Item as="li">
        <Nav.Link  href={url+"crea-tu-cuenta-de-empresas"}>  ¿Ya tienes cuenta? Empresa <FontAwesomeIcon icon={faBuilding} /></Nav.Link>
        </Nav.Item>
        ): (
            <>
            </>
        )}
        
        <Nav.Item as="li">
            {sessionEmpresas ? (
                <Nav.Link href={url+"perfil-empresa"}>  Hola, {sessionEmpresas.nombre} <FontAwesomeIcon icon={faBuilding} />  / <span onClick={cerrarSession}> Salir</span> </Nav.Link>
            ) : sessionUsuarios ? (
                <Nav.Link href={url+"perfil-usuario"}>  Hola, {sessionUsuarios.nombre} <FontAwesomeIcon icon={faUserAlt} />  / <span onClick={cerrarSession}> Salir</span> </Nav.Link>
            )  : (
                <Nav.Link  onClick={handleShow}>  Ingresar como Candidato <FontAwesomeIcon icon={faUserAlt} /></Nav.Link>
            )}

        </Nav.Item>
    </Nav>

    <ModalSesion show={show} onHide={handleClose}/>

    </Col>
  </Row>
</Container>
</div>
    );

}