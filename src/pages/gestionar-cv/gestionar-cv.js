import React from 'react';
import { Container, Row, Col, Nav, Button} from 'react-bootstrap';
import { url } from '../../utils/constans';


import './gestionar-cv.scss';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

export default function GestionarCv(){



    if(sessionEmpresas){

        return <Container className="contenedor"> 
                    <Row>
                        <Col>

                        <Nav variant="tabs">
                            <Nav.Item>
                            <Nav.Link href={url+"perfil-empresa"}><h3>VACANTES</h3></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link href={url+"gestionar-cv"} className="active"><h3>GESTIONAR CV</h3></Nav.Link>
                            </Nav.Item>
                        </Nav>

                        </Col>

                    </Row>

                        <hr/>
               </Container>;

    }else{

        window.location = url;

    }
}