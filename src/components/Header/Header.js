import React from "react";
import Menu from "../Menu/Menu";
import Cintilla from "../Cintilla/Cintilla";
import Search from '../../pages/search';

import './Header.scss';

export default function Header(){

    return (
        <>
        <Cintilla/>
        <Menu/>
        <Search/>
        </>
    );


}

