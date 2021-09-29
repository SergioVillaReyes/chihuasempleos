import React from 'react';
import { Carousel } from 'react-bootstrap';
import Slide1 from '../../assets/img/1.jpg'
import Slide2 from '../../assets/img/2.jpg'


import './Slide.scss';

export default function Slide(){

return (
<Carousel fade>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Slide2}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>ESPECIALIZACIÓN</h3>
      <p>El Éxito Depende Del Trabajo</p>
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Slide1}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>INNOVACIÓN</h3>
      <p>Creamos Las Oportunidades</p>
    </Carousel.Caption>
  </Carousel.Item>

</Carousel>
);
}