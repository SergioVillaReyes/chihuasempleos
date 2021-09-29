import React, { useState } from 'react';
import { Container, Row, Col, Nav, Button} from 'react-bootstrap';
import { url } from '../../utils/constans';
import TablaVacantes from '../../components/TablaVacantes/';
import ModalAgregarVacante from '../../components/ModalAgregarVacante/';

import './perfil-empresa.scss';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);


export default function PerfilEmpresa(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

        if(sessionEmpresas){

            return <Container className="contenedor"> 
                        <Row>
                            <Col>

                            <Nav variant="tabs">
                                <Nav.Item>
                                <Nav.Link href={url+"perfil-empresa"} className="active"><h3>VACANTES</h3></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link href={url+"gestionar-cv"}><h3>GESTIONAR CV</h3></Nav.Link>
                                </Nav.Item>
                            </Nav>

                            </Col>
                        </Row>

                        <Row className="fila-btn">
                            <Col>
                                <Button variant="outline-primary" className="btnArgegarVacante" onClick={handleShow}>
                                    Crear Vacante
                                </Button>
                                <ModalAgregarVacante show={show} onHide={handleClose}/>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <TablaVacantes company={sessionEmpresas.nombre}/>
                        </Row>
                </Container>;

        }else{

            window.location = url;

        }

}