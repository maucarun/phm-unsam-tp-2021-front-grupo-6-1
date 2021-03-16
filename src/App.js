import React from "react";
import Table from "./table/table"
import Footer from "./footer/footer"
import Header from "./header/header"
import Busqueda from "./busqueda/busqueda"
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => (
  <div className="App">
    <Header/>
    <Busqueda/>
    <Footer/>
  </div>
)

export default App
//<Table/>
