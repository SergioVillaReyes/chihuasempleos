import React from 'react';
import Slide from '../components/Slide/Slide';
import { url } from '../utils/constans';

const sessionEmp = sessionStorage.getItem("sessionEmpresas");
const sessionEmpresas = JSON.parse(sessionEmp);

export default function Home(){

    if(sessionEmpresas){

        window.location = url+"perfil-empresa";

    }else{
        return (
            <>
            <br/>
            <Slide/>
            <br/>
            </>
        );

    }

    
}