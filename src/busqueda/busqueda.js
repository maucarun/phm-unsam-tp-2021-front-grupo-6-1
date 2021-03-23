import React, {useState, useEffect} from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import {Checkbox} from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { preguntaService } from '../services/pregunta-service'
import { usuarioService } from '../services/usuario-service'
import './busqueda.css'

const Busqueda = ({history}) => {

    const encabezadoDeTabla = "Resultado de busqueda"    
    const [valorBusqueda, setValorBusqueda] = useState("")
    const [soloActivas, setSoloActivas] = useState(false)
    const [preguntas, setPreguntas] = useState([])

    useEffect(async () => {
        await buscar(valorBusqueda)
    }, [soloActivas])

    const allInstances = async() => {
        const instances = await preguntaService.allInstances()
        setPreguntas(instances)
    }

    const seleccionarButton = (preguntaCell) => {
        return(
            preguntaCell.autor.userName === usuarioService.userLogged.userName ?
            <Button id="button-column" label="Editar" onClick={() => navegarAEdicion(preguntaCell.id)}/>
            :
            <Button id="button-column" label="Responder" onClick={() => navegarAResponder(preguntaCell.id)}/>
        )
    }

    const buscar = async(valor) => {
        if(valor !== "") {
            const data = await preguntaService.getPreguntas(valor, soloActivas)
            setPreguntas(data)
        } else {
            await allInstances()
            //falta filtrar allInstances cuando soloActivas = true
        }
    }

    const alCambiarValorDeBusqueda = async (event) => {
        setValorBusqueda(event.target.value)
        await buscar(event.target.value)
    }

    const navegarAEdicion = (id) => {
        history.push(`/pregunta/${id}`)
    }

    const navegarAResponder = (id) => {
        history.push(`/responder/${id}`)
    }

    return (
        <React.Fragment>
            <div className="busqueda">
                <span className="title">Busqueda de Preguntas</span>
                <div className="body">
                    <InputText  className="inputtext" value={valorBusqueda} onChange={(event) => alCambiarValorDeBusqueda(event)}/>
                    <Button id="button" icon="pi pi-search iconoBusqueda" iconPos="right" onClick={() => buscar()}/>
                </div>
                <div className="chckbx-desc">
                    <Checkbox className="" onChange={() => setSoloActivas(!soloActivas)} checked={soloActivas}></Checkbox>
                    <span className="chckbx-span">Solo activas</span>
                </div>
            </div>
            <div className="data-table">
                <DataTable value={preguntas} autoLayout={true} scrollable scrollHeight="220px">
                    <Column className ="descripcion" field="descripcion" header={encabezadoDeTabla}></Column>
                    <Column className ="column-buttons" body={seleccionarButton} with="30%" ></Column>
                </DataTable>
            </div>
            <div className="button-bottom">
                <Button label="Nueva Pregunta" onClick={navegarAEdicion}/>
            </div>
        </React.Fragment>
    )
}
export default Busqueda