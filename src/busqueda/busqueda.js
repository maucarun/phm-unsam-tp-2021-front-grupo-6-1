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

    useEffect(() => {
        allInstances()
    }, [])

    const encabezadoDeTabla = "Resultado de busqueda"    
    const [valorBusqueda, setValorBusqueda] = useState("")
    const [ckeckbx, setCheckbx] = useState(false)
    const [preguntas, setPreguntas] = useState([])

    const allInstances = async() => {
        const instances = await preguntaService.allInstances()
        setPreguntas(instances)
    }

    const seleccionarButton = (preguntaCell) => {
        return(
            preguntaCell.autor.userName === usuarioService.userLogged.userName ?
            <Button className="button-column" label="Editar" onClick={navegarAEdicion}/>
            :
            <Button className="button-column" label="Responder" onClick={() => navegarAResponder(preguntaCell.id)}/>
        )
    }

    const buscar = async(valor) => {
        const data = await preguntaService.getPreguntas(valor)
        setPreguntas(data)
    }

    const alCambiarValorDeBusqueda = (event) => {
        setValorBusqueda(event.target.value)
        if(event.target.value !== "") {
            buscar(event.target.value)
        }
    }

    const navegarAEdicion = () => {
        history.push("/")
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
                <Button label="Nueva Pregunta" onClick={navegarAEdicion}/>
            </div>
        </React.Fragment>
    )
}
export default Busqueda