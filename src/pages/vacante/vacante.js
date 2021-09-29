import React from "react";
import { Container, Col, Row, Spinner, Card , Button} from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { urlApi } from '../../utils/constans';
import useFetch from '../../hooks/useFetch';

import './vacante.scss';

export default function Vacante(){

    const { id } = useParams();

    const data = useFetch(urlApi+"vacantes.peticion.php?vacantePorNombre="+id); 

    const vacante = data.result;

    const loading = data.loading;



    

    return (
        <Container>
            <Col>
                <Row>
                {loading || !vacante ? (
       <div className="loading">
       <Spinner animation="border" role="status" />
       <h5>Cargando...</h5>
        </div>
        ) : ( 

            <Card>
            <Card.Body>
              <Card.Title><h2>{vacante.nombre}</h2></Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Publicado el : {vacante.fecha}</Card.Subtitle>
              <hr/>
              <div className="datos-compl">
                <p><strong>Número requerido de empleados :</strong> {vacante.noempleados}</p>
                <p><strong>Sueldo :</strong> {vacante.salario}</p>
                <p><strong>Jornada de tiempo laboral :</strong> {vacante.tipojornada}</p>
                <p><strong>Sector de la vacante :</strong> {vacante.sector}</p>
              </div>
              
                <hr/>
              <Card.Text>
              <p>  <div dangerouslySetInnerHTML={{ __html: vacante.descripcion }}></div></p>
              </Card.Text>


              <hr/>
              <Card.Text>
              <p><strong>Empleador : {vacante.compania}</strong></p>
              </Card.Text>
              
              <Card.Text>
              <p><strong>Sector : {vacante.sector}</strong></p>
              </Card.Text>

                <Button>
                    Aplicar ahora!
                </Button>
                
            </Card.Body>
          </Card>

        )}
                </Row>
            </Col>
        </Container>
    );

}