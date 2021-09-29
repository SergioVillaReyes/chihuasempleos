import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { url, urlApi } from '../../utils/constans';
import swal from 'sweetalert';
import md5 from 'md5';

import './ModalSesion.scss';

export default function ModalSesion(props){

    const { show, onHide } = props;

    const [formValue, setFormValue] = useState({
        email:"",
        password:""
    });

    const onFormchange = event => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
      }

      async function IngresoUsuarios  (e)  {

        e.preventDefault();
      
        const { email, password } = formValue;
      
        if(!email || !password){
      
          swal({
            title: "WARNING",
            text: "Todos los campos son obligatorios!",
            icon: "warning",
            dangerMode: true,
          })
      
        }else{
      
          const IngresoUsuarios = JSON.stringify(formValue);
      
          const respuesta = await fetch(urlApi+"usuarios.peticion.php?IngresoUsuarios", {
              method: "POST",
              body: IngresoUsuarios,
          });  
      
          const peticion = await respuesta.json();

      
          if(peticion != false){ 
      
            const passwordEncriptado = md5(password);

            console.log('peticion.password',peticion.password);
            console.log('passwordEncriptado',passwordEncriptado);
      
            if(peticion.email == email && peticion.password == passwordEncriptado){
      
              // almacenar una sesión
              var objSession = { 'key': peticion.id, 'nombre': peticion.nombre, 'email': peticion.email };
              sessionStorage.setItem('sessionUsuarios', JSON.stringify(objSession));

              swal("Ha ingresado correctamente", {
                buttons: {
                  cancel: "Esta dentro del sistema",
                },
                icon: "success",
              })
              .then((value) => {
                switch (value) {
               
                  case "catch":
                    window.location = url+"perfil-usuario";
                    break;
               
                  default:
                    window.location = url+"perfil-usuario";
                }
              });
      
      
      
            }else{
      
              swal({
                title: "WARNING",
                text: "Su correo o contraseña estan erroneos",
                icon: "warning",
                dangerMode: true,
              })
      
            }
            
      
          }else{
      
            swal({
              title: "WARNING",
              text: "El correo no existe en la base de datos",
              icon: "warning",
              dangerMode: true,
            })
    
          }
      
        }
      
      }

    
    return (

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Ingresa a tu cuenta y postulate a los mejores empleos</Modal.Title>
            </Modal.Header>
        <Modal.Body>


                <Form
                    onChange={onFormchange}
                    onSubmit={IngresoUsuarios}
                >

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" name="email" placeholder="Ingresa tu correo" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Ingresar
            </Button>

                </Form>


        </Modal.Body>
        <Modal.Footer>
            <Form.Text className="text-muted">
            <a href={url+"crear-cuenta-usuarios"}>¿Aún no tienes cuenta? <strong>Crea una aquí!</strong></a>
            </Form.Text>
        </Modal.Footer>
      </Modal>

    );
}