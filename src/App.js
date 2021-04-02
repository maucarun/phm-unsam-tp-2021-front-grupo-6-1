import React from "react";
import Table from "./table/table"
import Footer from "./footer/footer"
import Header from "./header/header"
import Busqueda from "./busqueda/busqueda"
import { Routes } from './route.js'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'

const App = () => (
  <div className="App">
    <Routes />
    <Footer />
  </div>
)

export default App
