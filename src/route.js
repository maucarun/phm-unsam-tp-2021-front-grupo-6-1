import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./header/header";
import Busqueda from "./busqueda/busqueda";
import Perfil  from "./perfil_usuario/perfil";
//import Login from './login/login'
//import Pregunta from './pregunta/pregunta'
//import Usuario from './usuario/usuario'

export const Routes = () => (
  <Router>
    <Route path="/(.+)" component={Header} />
    <Route path="/busqueda" component={Busqueda} />
    <Route path="/perfil_usuario" component={Perfil} />
  </Router>
);
//<Route exact={true} path="/" component={Login} />
//<Route path="/pregunta/:id" component={Pregunta} />
//<Route path="/usuario/:id" component={Usuario} />
