import React, { useState , useRef} from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import JoditEditor from "jodit-react";
import Select from 'react-select';
import { url, urlApi } from '../../utils/constans';
import swal from 'sweetalert';

import './ModalAgregarVacante.scss';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

export default function ModalAgregarVacante(props){

    const { show, onHide } = props;

    const [formValue, setFormValue] = useState({
        nombre:"",
        compania:"",
        ruta:"",
        categoria:"",
        noempleados:"",
        tipojornada:"",
        salario:"",
        periodo:"",
        descripcion:"",
        sector:""
    });



    const onFormchange = event => {

        const { nombre } = formValue;
        const rutaFiltroUno = nombre.replace(/ /g,"-");
        const rutaFiltroDos = rutaFiltroUno.split('/').join('-');
        const rutaFiltroTres = rutaFiltroDos.split('*').join('-');
        const rutaFiltroCuatro = rutaFiltroTres.split('"').join('');
        const rutaFiltroCinco = rutaFiltroCuatro.split('(').join('');
        const rutaFiltroSeis = rutaFiltroCinco.split(')').join('');
        const rutaFiltroSiete = rutaFiltroSeis.split('ñ').join('n');
        const rutaFiltroOcho = rutaFiltroSiete.split('!').join('');

        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};

        const ruta = rutaFiltroOcho.split('').map( letra => acentos[letra] || letra).join('').toString();	

        console.log('ruta',ruta);

        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value,
            "ruta": ruta.toLowerCase(),
            "compania": sessionEmpresas.nombre
        })
      }

      

    const selecCategoria = selecCategoria => {
        setFormValue({
            ...formValue,
            "categoria":selecCategoria.value
        });

    };

    const selecNumEmp = selecNumEmp => {
        setFormValue({
            ...formValue,
            "noempleados":selecNumEmp.value
        });

    };

    const selecJornada = selecJornada => {
        setFormValue({
            ...formValue,
            "tipojornada":selecJornada.value
        });

    };

    const selectPeriodo = selectPeriodo => {
        setFormValue({
            ...formValue,
            "periodo":selectPeriodo.value
        });

    };


    const editor = useRef(null)
    const config = {
		readonly: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_clear_html"
	}

    async function agregarVacante  (e)  {
    
        e.preventDefault();

        const { nombre, categoria, noempleados, tipojornada, salario,  periodo, descripcion,  sector} = formValue;

        if( !nombre || !categoria || !noempleados || !tipojornada || !salario || !periodo || !descripcion || !sector ){
      
            swal({
              title: "WARNING",
              text: "Todos los campos son obligatorios!",
              icon: "warning",
              dangerMode: true,
            })
        
          }else{

            const addVacante = JSON.stringify(formValue);

            const respuesta = await fetch(urlApi+"vacantes.peticion.php?addVacante", {
                method: "POST",
                body: addVacante,
            });  
        
            const peticion = await respuesta.json();

            if(peticion == "ok"){ 

                swal("La vacante se agrego correctamente", {
                  buttons: {
                    cancel: "Seguir navegando",
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
        
        }


    }
    // console.log('formValue',formValue);
    }

    const categoria = [
        {value: "administrativos", label:"Administrativos"},
        {value: "docencia", label:"Docencia"},
        {value: "ingenieria", label:"Ingeniería"},
        {value: "tecnicos", label:"Técnicos"},
        {value: "almacen", label:"Almacen"},
        {value: "diseno", label:"Diseño"},
        {value: "marketing", label:"Marketing"},
        {value: "programacion", label:"Programación"},
        {value: "salud", label:"Sector Salud"},
        {value: "restaurantes", label:"Restaurantes"},
        {value: "bares", label:"Bares o Similares"},
        {value: "contaduria", label:"Contaduria"},
        {value: "leyes", label:"Leyes"}
    ];

    const numV = [
        {value: "indefinido", label:"Indefinico"},
        {value: "1", label:"1"},
        {value: "2", label:"2"},
        {value: "3", label:"3"},
        {value: "mas de 5", label:"Mas de 5"},
        {value: "contratacion continua", label:"Contratación continua"}
    ];

    
    const periodo = [
        {value: "por hora", label:"Por Hora"},
        {value: "por dia", label:"Por Día"},
        {value: "semanal", label:"Semanal"},
        {value: "mensual", label:"Mensual"},
        {value: "indefinico", label:"indefinido"}
    ];


    const jornada = [
        {value: "turno completo", label:"Turno Completo"},
        {value: "medio turno", label:"Medio Turno"},
        {value: "remoto", label:"Remoto"},
        {value: "otro", label:"Otro"}
    ];

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>AGREGAR UNA VACANTE</Modal.Title>
        </Modal.Header>
    <Modal.Body>


            <Form
                onChange={onFormchange}
                onSubmit={agregarVacante}
            >

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Row>

            <Col>
            <Form.Control type="text" name="nombre" placeholder="Título de la ocupación" />
            </Col>


            <Col>
            <Select
            classNamePrefix="basic=single"
            classNamePrefix="seleccionar"
            defaultValue={categoria[0]}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="categoria"
            placeholder="Seleccione un sector"
            options={categoria}
            onChange={selecCategoria}
            />

            </Col>

            </Row>
        </Form.Group>




        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Row>

            <Col>
            <Select
            name="noempleados"
            placeholder="Empleados requeridos"
            options={numV}
            onChange={selecNumEmp}
            />
            </Col>


            <Col>
            <Select
            name="tipojornada"
            placeholder="Tipo de Jornada"
            options={jornada}
            onChange={selecJornada}
            />
            </Col>



            </Row>
        </Form.Group>


        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Row>
                <Col>
                    <Form.Control type="text" name="salario" placeholder="Salario (MXN)" />
                </Col>
                <Col>
                    <Select
                    name="periodo"
                    placeholder="Periodo"
                    options={periodo}
                    onChange={selectPeriodo}
                    />
                </Col>
            </Row>
        </Form.Group>



        <Form.Group className="mb-3 contenedoreditor" controlId="formBasicPassword">
        <Form.Label>Experiencia laboral y descripción del empleo (breve descripción)</Form.Label>
        <JoditEditor 
        name="descripcion"
        className="editor"
        ref={editor}
        config={config}
        onBlur={newContent => setFormValue({...formValue,"descripcion":newContent})}
        
        />
        </Form.Group>


        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Row>

            <Col>
            <Form.Control type="text" name="sector" placeholder="Sector de la Vacante" />
            </Col>

            </Row>
        </Form.Group>
        


        <Button variant="primary" type="submit">
            Publicar la Vacante
        </Button>

            </Form>


    </Modal.Body>
    <Modal.Footer>
        <Form.Text className="text-muted">
        </Form.Text>
    </Modal.Footer>
  </Modal>
    );
}