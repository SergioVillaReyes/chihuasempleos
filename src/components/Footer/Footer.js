import React from 'react';
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
  } from "./FooterStyles";
  import { ReactComponent as Logo } from '../../assets/img/logo.svg';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faFacebookF } from '@fortawesome/free-brands-svg-icons' ;



export default function Footer(){

    return (
    <Box>
      <h1 style={{ color: "black", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        La Busqueda Empieza y Termina con Nosotros
      </h1>
      <Container>
        <Row>
          <Column>
          <br/>
          <br/>
          <br/>
          <Logo className="logotipo-chihuas"/>
          <br/>
          <FooterLink href="https://www.facebook.com/Chihuas-Empleos-1052506421806253/" target="_link">Siguenos en <FontAwesomeIcon icon={faFacebookF} /></FooterLink>
          </Column>


        </Row>
      </Container>
    </Box>
    );
}