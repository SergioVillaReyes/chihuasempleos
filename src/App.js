import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


//header & footer
import Header from './components/Header';
import Footer from './components/Footer';

//pages
import Home from './pages/home';
import PublicarMisVacantes from './pages/publicar-mis-vacantes';
import UltimasVacantes from './pages/utlimas-vacantes';
import Search from './pages/search';
import Error404 from './pages/error404';
import Vacante from './pages/vacante';
import CreaTuCuentaDeEmpresas from './pages/crea-tu-cuenta-empresas';
import PerfilEmpresa from './pages/perfil-empresa';
import CreaCuentaUsuarios from './pages/crear-cuenta-usuarios';
import PerfilUsuario from './pages/perfil-usuario';
import GestionarCv from './pages/gestionar-cv';


function App() {



  return (

    <Router>
<Header/>
      <Switch>

        <Route path="/" exact={true}>
          <Home/>
        </Route>

        <Route path="/publicar-mis-vacantes" exact={true}>
          <PublicarMisVacantes/>
        </Route>

        <Route path="/ultimas-vacantes" exact={true}>
          <UltimasVacantes/>
        </Route>

        <Route path="/search" exact={true}>
          <Search/>
        </Route>

        <Route path="/vacante/:id" exact={true}>
          <Vacante/>
        </Route>

        <Route path="/crea-tu-cuenta-de-empresas" exact={true}>
          <CreaTuCuentaDeEmpresas/>
        </Route>

        <Route path="/perfil-empresa" exact={true}>
          <PerfilEmpresa/>
        </Route>

        <Route path="/gestionar-cv" exact={true}>
          <GestionarCv/>
        </Route>

        <Route path="/crear-cuenta-usuarios" exact={true}>
          <CreaCuentaUsuarios/>
        </Route>

        <Route path="/perfil-usuario" exact={true}>
          <PerfilUsuario/>
        </Route>

        <Route path="*">
          <Error404/>
        </Route>

      </Switch>
<Footer/>
    </Router>


  );
}

export default App;
