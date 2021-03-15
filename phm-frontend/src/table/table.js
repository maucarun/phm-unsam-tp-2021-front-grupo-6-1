import React, {useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Checkbox} from 'primereact/checkbox';

let respuestas = [{descripcion: "respuesta 1", elegida: false}, {descripcion: "respuesta 2", elegida: false}, 
                    {descripcion: "respuesta 3", elegida: false}, {descripcion: "respuesta 4", elegida: false},
                    {descripcion: "respuesta 5", elegida: false}, {descripcion: "respuesta 6", elegida: false}]

const Table = () => {
    return(
        <div className="">
            <DataTable value={respuestas} autoLayout={true}>
                <Column className ="" field="descripcion" header="RESPUESTAS"></Column>
                <Column className ="" body={seleccionar}></Column>
            </DataTable>
        </div>
    )
}
export default Table

const seleccionar = (respuesta) => {
    return(
        <Checkbox onChange={event => setChecked(event)} checked={respuesta.descripcion}></Checkbox>
        )
    }
    
const setChecked = (event) => {

}