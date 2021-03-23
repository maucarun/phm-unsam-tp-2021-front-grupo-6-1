import React, {useState, useEffect} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button'
import './table.css'
import { preguntaService } from "../services/pregunta-service";
import Pregunta from "../dominio/pregunta";
import { usuarioService } from "../services/usuario-service";
import { confirmPopup } from 'primereact/confirmpopup'
import { Dialog } from 'primereact/dialog';


const Table = ({history, match}) => {

    useEffect(()=>{
        buscarPregunta()
    }, [])

    const [pregunta, setPregunta] = useState(new Pregunta())
    const [opciones, setOpciones] = useState([])
    const [mensajeDeError, setMensajeDeError] = useState(false)
    const [nombreAutor, setNombreAutor] = useState("")
    const [apellidoAutor, setApellidoAutor] = useState("")
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [displayIncorrect, setDisplayIncorrect] = useState(false)
    
    const buscarPregunta = async () => {
        const preg = await preguntaService.getPregunta(match.params.id)
        setPregunta(preg)
        setNombreAutor(preg.autor.nombre)
        setApellidoAutor(preg.autor.apellido)
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

    const confirm = (opcion) => {
        confirmPopup({
            message: "¿ Confirmar Respuesta ?",
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptFunc(opcion),
            reject: () => rejectFunc()
        });
    }

    const rejectFunc = () => {

    }
    
    const acceptFunc = (opcion) => {
        if(opcion === pregunta.respuestaCorrecta) {
            actualizarUser()
            setDisplaySuccess(true)
        } else {
            setDisplayIncorrect(true)
        }
    }
    
    const actualizarUser = async () => {
        const idUser = usuarioService.userLogged.id
        usuarioService.userLogged.preguntasRespondidas.push(pregunta)
        //await usuarioService.actualizarUsuario(usuarioService.userLogged)
        console.log(usuarioService.userLogged)
        //const updatedUser = await usuarioService.getUsuario(idUser)
        //usuarioService.userLogged = updatedUser
    }
    
    const aceptar = async () => {
        if(soloUnaOpcionSeleccionada()) {
            setMensajeDeError(false)
            const opSelec = opcionSeleccionada()
            confirm(opSelec)
        } else {
            setMensajeDeError(true)
        }
    }
    
    const cancelar = () => {
        history.push("/busqueda")
    }
    
    const soloUnaOpcionSeleccionada = () => {
        return filtrarOpcionesSeleccionadas().length === 1
    }
    
    const filtrarOpcionesSeleccionadas = () => {
        const opcionesSeleccionadas = opciones.filter(op => op.elegida === true)
        return opcionesSeleccionadas
    }
    
    const opcionSeleccionada = () => {
        const op = filtrarOpcionesSeleccionadas()    
        return op[0].descripcion
    }
    
    const cerrarPantallaSuccess = () => {
        setDisplaySuccess(false)
        history.push("/busqueda")
    }

    const cerrarPantallaIncorrect = () => {
        setDisplayIncorrect(false)
        history.push("/busqueda")
    }
    
    return(
        <div className="container-table">
            <div className="table-and-span">
                <span className="autor">Autor: {nombreAutor} {apellidoAutor}</span>
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
            <Dialog header="¡ Felicitaciones !" visible={displaySuccess} style={{ width: '50vw' }} onHide={() => cerrarPantallaSuccess()}>
                <span className="congratulations">Usted ha respondido correctamente </span>
            </Dialog>
            <Dialog header="Incorrecto" visible={displayIncorrect} style={{ width: '50vw' }} onHide={() => cerrarPantallaIncorrect()}>
                <span className="no-congratulations">Su respuesta es incorrecta. Siga intentando. </span>
            </Dialog>
        </div>
    )
}
export default Table