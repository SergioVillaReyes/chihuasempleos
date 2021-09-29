import React, { useState } from 'react';
import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import { urlApi, url } from '../../utils/constans';

import './crea-cuenta-usuarios.scss';

export default function CreaCuentaUsuarios(){


    const [formValue, setFormValue] = useState({
        name: "",
        email:"",
        password:""
    });

    const onFormchange = event => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    async function RegistroUsuarios  (e)  {

        e.preventDefault();

        const { name, email, password } = formValue;

        if(!name || !email || !password){

            swal({
              title: "WARNING",
              text: "Todos los campos son obligatorios!",
              icon: "warning",
              dangerMode: true,
            })

    }else{

        const datosUsuario = JSON.stringify(formValue);

        const respuesta = await fetch(urlApi+"usuarios.peticion.php?datosUsuario", {
            method: "POST",
            body: datosUsuario,
        }); 

        const datos = await respuesta.json();

        if (datos === "ok") {
  
            swal("Perfecto! Revise su correo electronico", {
              buttons: {
                cancel: "Seguir navegando",
                catch: {
                  text: "Ingresar al Sistema",
                  value: "catch",
                }
              },
              icon: "success",
            })
            .then((value) => {
              switch (value) {
             
                case "catch":
                  window.location = url;
                  break;
             
                default:
                  window.location = url;
              }
            });
  
  
              setFormValue({
                  name: "",
                  email:"",
                  password:""
              });
  
      
          } else {
  
            swal({
              title: "Email Regisrtado!",
              text: "El correo ya esta registrado en la base de datos, intente con otro",
              icon: "warning",
              button: "Ingresar otro correo",
            });

            setFormValue({
                name: "",
                email:"",
                password:""
            });
              
          }
        
    }
}



    return (
        <Navbar expand="lg" variant="light" bg="light" className="contenedor_users">
        <Container >
          <Navbar.Brand href="#"><h3>Registrate como Usuario <FontAwesomeIcon icon={faUser} /></h3></Navbar.Brand>
      <Form
onChange={onFormchange}
onSubmit={RegistroUsuarios}
      >
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" name="name" value={formValue.name} placeholder="Tu nombre completo" />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control type="email" name="email" value={formValue.email}  placeholder="Ingresa tu Email"/>
      </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" name="password" value={formValue.password} placeholder="Password" />
        </Form.Group>
<hr/>
        <Form.Group className="mb-3 politicas" controlId="formBasicPassword">
            <a href="https://www.iubenda.com/privacy-policy/31633797" target="_blank" className="iubenda-white iubenda-embed" title="Politica de privacidad">
            <p>Al registrarse, usted acepta nuestras condiciones de uso y políticas de privacidad <input id="regPoliticas" type="checkbox" checked/></p>
            </a>
        </Form.Group>
      
        <hr/>


  

      
        <Button variant="primary" type="submit">
          Enviar datos
        </Button>
      
      </Form>
      
        </Container>
      </Navbar>
    );
}