import React from 'react'
import './header.css'
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button'

export const Header = ({history}) => {
    
    const navigate = (ruta) => {
        history.push(ruta)
    }

    const rightContents = (
        <React.Fragment>
                <Button id="btn" label="Home" icon="pi pi-home" className="p-mr-2" onClick={() => navigate("/busqueda")}/>
                <Button id="btn" label="Perfil" icon="pi pi-user" className="p-mr-2" onClick={() => navigate("/perfil_usuario")}/>
                <Button id="btn" label="Salir" icon="pi pi-sign-out" className="p-mr-2" onClick={() => navigate("/")}/>
        </React.Fragment>
    );

    return (
        <div className="header">
            <h1 className="title-header">Pregunta3!</h1>
            <Toolbar id="toolbar" right={rightContents} />    
        </div>
    )
}

export default Header