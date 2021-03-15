import React, {useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Checkbox} from 'primereact/checkbox';


const Table = () => {
    const respuestasArray = [{id: 1, descripcion: "respuesta 1", elegida: false}, {id: 2, descripcion: "respuesta 2", elegida: false}, 
                        {id: 3, descripcion: "respuesta 3", elegida: false}, {id: 4, descripcion: "respuesta 4", elegida: false},
                        {id: 5, descripcion: "respuesta 5", elegida: false}, {id: 6, descripcion: "respuesta 6", elegida: false}]
    
    const [respuestas, setRespuestas] = useState(respuestasArray)
    
    const seleccionar = (respuesta) => {
        return(
            <Checkbox onChange={() => setChckbx(respuesta.id)} checked={respuesta.elegida}></Checkbox>
            )
        }
    
    const setChckbx = (id) => {
        const updatedList = respuestas.map(respuesta => {
            if(respuesta.id === id) {
                respuesta.elegida = !respuesta.elegida
            }
            return respuesta
        })
        setRespuestas(updatedList)
    }

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