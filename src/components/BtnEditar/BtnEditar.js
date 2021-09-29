import React from "react";
import {Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalEditarVacante from '../../components/ModalEditarVacante';

export default function BtnEditar(props){

    const { ruta, btnAbrirCerrarModal, show } = props;

    // console.log('props en BtnEditar',props);

    return (
        <>
        <ModalEditarVacante show={show}  onHide={btnAbrirCerrarModal}/>
        </>
    );

}