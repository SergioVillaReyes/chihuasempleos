import React from "react";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { urlApi, url } from '../../utils/constans';
import swal from 'sweetalert';



export default function BtnEliminar(props){

    const { id } = props;

     function eliminarVacante () {
  
        swal("¿Está usted seguro(a) de eliminar la vacante?", {
            buttons: {
              cancel: "Mejor no",
              catch: {
                text: "OK",
                value: "catch",
              }
            },
            icon: "warning",
          })
          .then((value) => {
            switch (value) {
           
              case "catch":
    async function eliminar(){

        const respuesta = await fetch(urlApi+"vacantes.peticion.php?eliminarVacante="+id, {
            method: "POST",
        }); 

        const datos = await respuesta.json();

        if(datos == "ok"){


            swal({
                title: "La vacante fue eliminada",
                text: "Seguir navegando",
                icon: "success",
                dangerMode: false,
              })

        }

    }

    eliminar();

    window.location = url+"perfil-empresa";
    
                break;
           
              default:
                window.location = url+"perfil-empresa";
            }
          });

    }

    return (
        <Button className="butons" variant="danger" onClick={eliminarVacante}> <FontAwesomeIcon icon={faTrash} />  </Button>
    );
}
