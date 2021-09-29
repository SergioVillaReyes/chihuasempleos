import React from "react";
import { Container, Row, Col, Nav} from 'react-bootstrap';
import { url } from '../../utils/constans';

import './perfil-usuario.scss';

const sessionUser = sessionStorage.getItem("sessionUsuarios");
const sessionUsuarios = JSON.parse(sessionUser);

export default function PerfilUsuario(){


    
    if(sessionUsuarios){

        return <Container> 
                    <Row>
                        <Col>
                        Perfil de Usuarios
                        </Col>
                    </Row>
               </Container>;

    }else{

        window.location = url;

    }
}