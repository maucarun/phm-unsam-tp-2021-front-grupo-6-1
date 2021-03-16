import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import './busqueda.css'

const Busqueda = () => {
    return (
        <div className="busqueda">
            <span className="title">Busqueda de Preguntas</span>
            <div className="body">
                <InputText  className="inputtext" />
                <Button id="button" icon="pi pi-search iconoBusqueda" iconPos="right" />
            </div>
        </div>
    )
}
export default Busqueda
