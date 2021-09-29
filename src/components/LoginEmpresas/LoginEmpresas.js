import React, { useState } from 'react';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import { url, urlApi } from '../../utils/constans';
import swal from 'sweetalert';
import md5 from 'md5';

import './LoginEmpresas.scss';

export default function LoginEmpresas(){

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


async function IngresoEmpresas  (e)  {

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

    const ingresoEmpresas = JSON.stringify(formValue);

    const respuesta = await fetch(urlApi+"empresas.peticion.php?ingresoEmpresas", {
        method: "POST",
        body: ingresoEmpresas,
    });  

    const peticion = await respuesta.json();

    if(peticion != false){ 

      const passwordEncriptado = md5(password);

      if(peticion.email == email && peticion.password == passwordEncriptado){

        // almacenar una sesión
        var objSession = { 'key': peticion.id, 'nombre': peticion.nombre, 'email': peticion.email };
        sessionStorage.setItem('sessionEmpresas', JSON.stringify(objSession));


        swal("Ha ingresado correctamente", {
          buttons: {
            cancel: "Esta dentro del sistema",
          },
          icon: "success",
        })
        .then((value) => {
          switch (value) {
         
            case "catch":
              window.location = url+"perfil-empresa";
              break;
         
            default:
              window.location = url+"perfil-empresa";
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
<Navbar expand="lg" variant="light" bg="light" >
  <Container >
    <Navbar.Brand href="#"><h3>Ingresa y publica tus vacantes gratis</h3></Navbar.Brand>
    <p><a href={url+"crea-tu-cuenta-de-empresas"}>Es necesario tener cuenta como Empresa, si no tienes has click aquí</a></p>
    <Form
    onChange={onFormchange}
    onSubmit={IngresoEmpresas}
    >
  <Form.Group className="mb-3" controlId="formBasicEmail">

    <Form.Control type="email" name="email" placeholder="Ingresa tu Email" />

  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">

    <Form.Control type="password" name="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Text className="text-muted">
  ¿Olvidaste tu contraseña?
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Ingresar
  </Button>
</Form>
<Form.Text className="text-muted">
  <a href={url+"crea-tu-cuenta-de-empresas"}>
  ¿Aún no tienes cuenta? <strong>Crea una!!!</strong>
  </a>
    </Form.Text>
  </Container>
</Navbar>
    );
}