import React from "react";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { url } from '../../utils/constans';

import './Menu.scss';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

const sessionUser = sessionStorage.getItem("sessionUsuarios");
const sessionUsuarios = JSON.parse(sessionUser);


export default function Menu(){

    return (
<Container>
    <Row>
        <Col>

    <Nav defaultActiveKey="/" as="ul" className="menu">

        <Nav.Item as="li">
            <Nav.Link href={url}>
            <Logo/>
            </Nav.Link>
        </Nav.Item>


{sessionEmpresas ? (
    <div>
    </div>
) : sessionUsuarios ? (
 
    <Nav.Item as="li">
        <Nav.Link href={url+"ultimas-vacantes"}>
            <p className="tabs">ultimas vacantes</p>
        </Nav.Link>
    </Nav.Item>

)  : (
<>



    <Nav.Item as="li">
    <Nav.Link href={url+"publicar-mis-vacantes"}>
        <p className="tabs">publica tus vacantes</p>
    </Nav.Link>
    </Nav.Item>
    
    <Nav.Item as="li">
        <Nav.Link href={url+"ultimas-vacantes"}>
            <p className="tabs">ultimas vacantes</p>
        </Nav.Link>
    </Nav.Item>
    </>
)}

    </Nav>


        </Col>
    </Row>
</Container>
    );
}