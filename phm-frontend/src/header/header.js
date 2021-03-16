import React from 'react'
import './header.css'
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button'

export const Header = () => {
    
    const rightContents = (
        <React.Fragment>
                <Button id="btn" label="Home" icon="pi pi-home" className="p-mr-2" />
                <Button id="btn" label="Perfil" icon="pi pi-user" className="p-mr-2" />
                <Button id="btn" label="Salir" icon="pi pi-sign-out" className="p-mr-2" />
        </React.Fragment>
    );

    return (
        <div className="header">
            <h1>Pregunta3!</h1>
            <Toolbar id="toolbar" right={rightContents} />    
        </div>
    )
}

export default Header