import React, { useState } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import { urlApi } from '../../utils/constans';
import BtnEliminar from '../BtnEliminar';
import BtnEditar from '../BtnEditar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalEditarVacante from '../../components/ModalEditarVacante';



import './TablaVacantes.scss';


export default function TablaVacantes(props){

  const [show, setShow] = useState(false);

  const [ruta, setRuta] = useState("");

  const { company } = props;

  const data = useFetch(urlApi+"empresas.peticion.php?vacantePorEmpresa="+company); 
  
  const vacantes = data.result;

  const loading = data.loading;

    function btnAbrirCerrarModal  ()  {

    
  }
  console.log('ruta',ruta);

  if(loading || !vacantes){
    return (
      <>
      </>
    )
  }else{

    return (
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Vacante</th>
            <th>Descripción</th>
            <th>Sector</th>
            <th>Salario</th>
            <th>Jornada</th>
            <th>Acciones</th>
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
                      
                      <td>{vacante.nombre}</td>
                      <td><div dangerouslySetInnerHTML={{ __html: vacante.descripcion.substring(0,300) }}></div>... </td>
                      <td>{vacante.sector}</td>
                      <td>$ {vacante.salario} {vacante.periodo}</td>
                      <td>{vacante.tipojornada}</td>
                      <td><BtnEliminar id={vacante.id}/>
                      <Button className="butons" variant="warning"  onClick={btnAbrirCerrarModal = () =>{setRuta(vacante.ruta); setShow(!show)}}><FontAwesomeIcon icon={faEdit} /></Button>
                      <ModalEditarVacante show={show}  onHide={btnAbrirCerrarModal} ruta={ruta}/></td>

                      </tr>
      
                ))
                
              )}
      
        </tbody>
      </Table>
          );

  }


}