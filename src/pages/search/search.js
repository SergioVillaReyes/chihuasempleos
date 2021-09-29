import React, { useState } from 'react';
import { Container, Row, Col, InputGroup , FormControl, Spinner, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { urlApi, url } from '../../utils/constans';
import useFetch from '../../hooks/useFetch';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

export default function Search(){

    const [formValue, setFormValue] = useState({
        vacante:""
    });

    const [showResults, setShowResults] = useState(false)

    const onShowHide = () => {
        setShowResults(!showResults)
    }



    const onFormchange = event => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
      }

      const vacanteBuscar = formValue.vacante;

      const data = useFetch(urlApi+"vacantes.peticion.php?buscarVacante=%"+vacanteBuscar+"%"); 
  
      const vacantes = data.result;



      console.log('vacantes',vacantes);



    if(sessionEmpresas){

        return (
            <div>
        
            </div>
        );
        
            }else{
        
            return (
                <Container>
                    <Row className="col-lg-6 search">
                        <Col>
                        
          <InputGroup className="mb-3s">

            <FormControl
              placeholder="Buscar empleos"
              aria-label="Buscar empleos"
              aria-describedby="basic-addon2"
              onChange={onFormchange}
              onClick= {onShowHide}
              name="vacante"
            />

            <InputGroup.Text id="basic-addon2"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>

          </InputGroup>
                        
                        </Col>
                    </Row>
                <hr/>
                <br></br>
                
                { showResults ? <Results vacantes={vacantes} /> : null }
                </Container>
            );
        
            }

}

function Results(props) {

    const { vacantes } = props;

    return (
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
    
    
        {!vacantes ? (  
            <>
            </>
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
    );
}
