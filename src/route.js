import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./header/header";
import Busqueda from "./busqueda/busqueda";
import Perfil from "./perfil_usuario/perfil";
import Login from './login/login'
import Table from "./table/table";
import PreguntaPage from './pregunta/pregunta'

export const Routes = () => (
  <Router>
    <Route path="/(.+)" component={Header} />
    <Route exact={true} path="/" component={Login} />
    <Route path="/busqueda" component={Busqueda} />
    <Route path="/perfil_usuario" component={Perfil} />
    <Route path="/responder/:id" component={Table} />
    <Route path="/pregunta/:id" component={PreguntaPage} />
  </Router>
);
