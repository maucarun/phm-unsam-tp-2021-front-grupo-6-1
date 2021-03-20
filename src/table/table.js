import React, {useState, useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button'
import './table.css'
import { preguntaService } from "../services/pregunta-service";
import Pregunta from "../dominio/pregunta";



const Table = ({history, match}) => {

    useEffect(()=>{
        buscarPregunta()
    }, [])

    const [pregunta, setPregunta] = useState(new Pregunta())
    const [opciones, setOpciones] = useState([])
    const[mensajeDeError, setMensajeDeError] = useState(false)

    const buscarPregunta = async () => {
        const preg = await preguntaService.getPregunta(match.params.id)
        setPregunta(preg)
        convertirOpciones(preg.opciones)
    }

    const convertirOpciones = (options) => {
        const opcionesConvertidas = []
        options.forEach(op => {
            opcionesConvertidas.push({descripcion: op, elegida: false})
        })
        setOpciones(opcionesConvertidas)
    }
    
    const seleccionar = (opcion) => {
        return(
            <Checkbox className="chckbx" onChange={() => setChckbx(opcion)} checked={opcion.elegida}></Checkbox>
            )
        }
    
    const setChckbx = (opcion) => {
        const updatedOptions = opciones.map(op => {
            if(opcion.descripcion === op.descripcion) {
                op.elegida = !op.elegida
            }
            return op
        })
        setOpciones(updatedOptions)
    }

    const aceptar = () => {
        soloUnaOpcionSeleccionada()
        ? 
        setMensajeDeError(false)
        :
        setMensajeDeError(true)
    }

    const cancelar = () => {
        history.push("/busqueda")
    }
    
    const soloUnaOpcionSeleccionada = () => {
        const opcionesSeleccionadas = opciones.filter(op => op.elegida === true)
        return opcionesSeleccionadas.length === 1
    }

    return(
        <div className="container-table">
            <div className="table-and-span">
                <span className="autor">Autor: Pepe Palala</span>
                <DataTable value={opciones} autoLayout={true}>
                    <Column className ="descripcion" field="descripcion" header={pregunta.descripcion}></Column>
                    <Column className ="" body={seleccionar}></Column>
                </DataTable>
            </div>
            <div className ="buttonsdiv">
                <div>
                    {mensajeDeError && <span className="validacion-opciones">Debe seleccionar solo una opcion</span>}
                </div>
                <div className ="buttons">
                <Button label="Aceptar" className="p-button-primary" onClick={() => aceptar()} />
                <Button label="Cancelar" className="p-button-secondary" onClick={() => cancelar()} />
                </div>
            </div>
        </div>
    )
}
export default Table