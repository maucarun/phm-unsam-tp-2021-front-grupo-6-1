import React, {useState} from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox';
import './busqueda.css'

const Busqueda = () => {
    const [ckeckbx, setCheckbx] = useState(false)

    

    return (
        <div className="busqueda">
            <span className="title">Busqueda de Preguntas</span>
            <div className="body">
                <InputText  className="inputtext" />
                <Button id="button" icon="pi pi-search iconoBusqueda" iconPos="right" />
            </div>
            <div className="chckbx-desc">
                <Checkbox className="" onChange={() => setCheckbx(!ckeckbx)} checked={ckeckbx}></Checkbox>
                <span className="chckbx-span">Solo activas</span>
            </div>
        </div>
    )
}
export default Busqueda
