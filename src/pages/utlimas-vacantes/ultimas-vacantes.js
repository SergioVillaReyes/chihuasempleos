import React from 'react';
import { Container, Col, Row, Table, Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import { urlApi, url } from '../../utils/constans';

import './ultimas-vacantes.scss';

export default function UltimasVacantes(){

    const data = useFetch(urlApi+"vacantes.peticion.php?todasVacantes", null);    

    const vacantes = data.result;

    const loading = data.loading;

return (
<Container>
    <br/>
    <Col>
        <Row>

            <Table striped bordered hover>
        <thead>
            <tr>
            <th>Vacante</th>
            <th>Compañia</th>
            <th>Sector</th>
            <th>Publicado en:</th>
            </tr>
        </thead>
        <tbody>


        {loading || !vacantes ? (
       <div className="loading">
       <Spinner animation="border" role="status" />
       <h5>Cargando...</h5>
        </div>
        ) : (

                vacantes.map((vacante, index) => (

                <tr key={index} className="vac-ind">
                
                <td><a href={url+"vacante/"+vacante.ruta}>{vacante.nombre}</a></td>
                <td><a href={url+"vacante/"+vacante.ruta}>{vacante.compania}</a></td>
                <td><a href={url+"vacante/"+vacante.ruta}>{vacante.sector}</a></td>
                <td><a href={url+"vacante/"+vacante.ruta}>{vacante.fecha}</a></td>
                </tr>

          ))
        )}


        </tbody>
            </Table>

        </Row>
    </Col>
</Container>
);

}