import React, {useState} from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './busqueda.css'

const Busqueda = () => {
    const preguntasArray = [{id: 1, descripcion: "pregunta 1"}, {id: 2, descripcion: "pregunta 2"}, 
                            {id: 3, descripcion: "pregunta 3"}, {id: 4, descripcion: "pregunta 4"}]
    const encabezadoDeTabla = "Resultado de busqueda"
    const [ckeckbx, setCheckbx] = useState(false)
    const [preguntas, setPreguntas] = useState(preguntasArray)
    const seleccionarButton = () => {
        return(
            <Button className="button-column" label="Responder"/>
        )
    }

    return (
        <div>
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
            <div className="data-table">
                <DataTable value={preguntas} autoLayout={true}>
                    <Column className ="descripcion" field="descripcion" header={encabezadoDeTabla}></Column>
                    <Column className ="" body={seleccionarButton}></Column>
                </DataTable>
            </div>
            <div className="button-bottom">
                <Button label="Nueva Pregunta"/>
            </div>
        </div>
    )
}
export default Busqueda