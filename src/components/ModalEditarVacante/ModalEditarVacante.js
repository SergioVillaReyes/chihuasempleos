import React, { useState , useRef, useEffect} from "react";
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap';
import JoditEditor from "jodit-react";
import Select from 'react-select';
import { url, urlApi } from '../../utils/constans';
import swal from 'sweetalert';
import useFetch from '../../hooks/useFetch';


const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

export default  function ModalAgregarVacante(props){

    const { show, onHide, ruta } = props;


    // const data = useFetch(urlApi+"vacantes.peticion.php?vacantePorNombre="+ruta); 

    // const vacante = "";

    // const loading = "";


    const [formValue, setFormValue] = useState({
        id: "",
        nombre: "",
        compania:"",
        ruta: "",
        categoria:"",
        noempleados:"",
        tipojornada:"",
        salario:"",
        periodo:"",
        descripcion:"",
        sector:""
    });

    async function agregarVacante ()  {

        const data = await fetch(urlApi+"vacantes.peticion.php?vacantePorNombre="+ruta, {});  
    
        const peticion = await data.json();
    
        setFormValue({
            ...formValue,
            "id": peticion.id,
            "nombre": peticion.nombre,
            "ruta":peticion.ruta,
            "compania": sessionEmpresas.nombre,
            "categoria": peticion.categoria,
            "noempleados": peticion.noempleados,
            "tipojornada": peticion.tipojornada,
            "salario": peticion.salario,
            "periodo": peticion.periodo,
            "descripcion": peticion.descripcion,
            "sector": peticion.sector
        })

    
        }

        useEffect(() => {
            agregarVacante ();
        }, [ruta])
    
        console.log('formValue',formValue); 


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




    async function modificarVacante  (e)  {
    
            e.preventDefault();


            const addVacante = JSON.stringify(formValue);

            const respuesta = await fetch(urlApi+"vacantes.peticion.php?modificarVacante", {
                method: "POST",
                body: addVacante,
            });  
        
            const peticion = await respuesta.json();

            console.log('addVacante',addVacante);

            if(peticion == "ok"){ 

                swal("La vacante se edito correctamente", {
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
        <Modal.Title>EDITAR VACANTE</Modal.Title>
        </Modal.Header>
    <Modal.Body>


            {
                    <Form
                    onChange={onFormchange}
                    onSubmit={modificarVacante}
                >
            <Form.Group className="mb-3" controlId="formNombre">
                <Row>
    
                <Col>
                <Form.Control type="text" name="nombre" placeholder={formValue.nombre}  />
                </Col>
    
    
                <Col>
                <Select
                classNamePrefix="basic=single"
                defaultValue={formValue.categoria}
                placeholder={formValue.categoria}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={true}
                name="categoria"
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
                placeholder={formValue.noempleados}
                options={numV}
                onChange={selecNumEmp}
                />
                </Col>
    
    
                <Col>
                <Select
                name="tipojornada"
                placeholder={formValue.tipojornada}
                options={jornada}
                onChange={selecJornada}
                />
                </Col>
    
    
    
                </Row>
            </Form.Group>
    
    
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
                    <Col>
                        <Form.Control type="text" name="salario" placeholder={formValue.salario} />
                    </Col>
                    <Col>
                        <Select
                        name="periodo"
                        placeholder={formValue.periodo}
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
            value={formValue.descripcion}
            ref={editor}
            config={config}
            onBlur={newContent => setFormValue({...formValue,"descripcion":newContent})}
            />
            </Form.Group>
    
    
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Row>
    
                <Col>
                <Form.Control type="text" name="sector" placeholder={formValue.sector} />
                </Col>
    
                </Row>
            </Form.Group>
            
    
    
            <Button variant="primary" type="submit">
               Guardar Cambios
            </Button>
    
                </Form>

                } 


    </Modal.Body>
    <Modal.Footer>
        <Form.Text className="text-muted">
        </Form.Text>
    </Modal.Footer>
  </Modal>
    );
}