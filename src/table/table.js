import React, { useState, useEffect, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button'
import './table.css'
import { preguntaService } from "../services/pregunta-service";
import Pregunta from "../dominio/pregunta";
import { usuarioService } from "../services/usuario-service";
import { confirmPopup } from 'primereact/confirmpopup'
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const Table = ({ history, match }) => {

    useEffect(async () => {
        await buscarPregunta()
    }, [])

    const toast = useRef(null)
    const [pregunta, setPregunta] = useState(new Pregunta())
    const [opciones, setOpciones] = useState([])
    const [mensajeDeError, setMensajeDeError] = useState(false)
    const [nombreAutor, setNombreAutor] = useState("")
    const [apellidoAutor, setApellidoAutor] = useState("")
    const [displaySuccess, setDisplaySuccess] = useState(false)
    const [displayIncorrect, setDisplayIncorrect] = useState(false)
    const [displayInactive, setDisplayInactive] = useState(false)

    const buscarPregunta = async () => {
        try {
            const preg = await preguntaService.getPregunta(match.params.id)
            setPregunta(preg)
            setNombreAutor(preg.autor.nombre)
            setApellidoAutor(preg.autor.apellido)
            convertirOpciones(preg.opciones)
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ocurrió un error al buscar la pregunta', detail: error.message, life: 5000 })
        }
    }

    const convertirOpciones = (options) => {
        const opcionesConvertidas = []
        options.forEach(op => {
            opcionesConvertidas.push({ descripcion: op, elegida: false })
        })
        setOpciones(opcionesConvertidas)
    }

    const seleccionar = (opcion) => {
        return (
            <Checkbox className="chckbx" onChange={() => setChckbx(opcion)} checked={opcion.elegida}></Checkbox>
        )
    }

    const setChckbx = (opcion) => {
        const updatedOptions = opciones.map(op => {
            if (opcion.descripcion === op.descripcion) {
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

    const acceptFunc = async (opcionElegida) => {
        await actualizarUser(opcionElegida)
        try {
            const _pregunta = await preguntaService.getPregunta(match.params.id)
            if (opcionElegida !== _pregunta.respuestaCorrecta) {
                setDisplayIncorrect(true)
            } else if (!_pregunta.activa) {
                setDisplayInactive(true)
            } else {
                setDisplaySuccess(true)
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ocurrió un error al intentar buscar la pregunta', detail: error.message, life: 5000 })
        }
    }

    const actualizarUser = async (opcionElegida) => {
        const opcionJson = { "opcionElegida": opcionElegida, "pregunta": pregunta.descripcion }
        try {
            await usuarioService.actualizarUsuario(usuarioService.userLogged.id, pregunta.id, opcionJson)
            usuarioService.userLogged = await usuarioService.getUsuario(usuarioService.userLogged.id)
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Ocurrió un error al actualizar sus datos', detail: error.message, life: 5000 })
        }
    }

    const aceptar = async () => {
        if (soloUnaOpcionSeleccionada()) {
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

    const cerrarPantallaInactiva = () => {
        setDisplayInactive(false)
        history.push("/busqueda")
    }

    return (
        <div className="container-table">
            <div className="table-and-span">
                <span className="autor">Autor: {nombreAutor} {apellidoAutor}</span>
                <DataTable value={opciones} autoLayout={true}>
                    <Column className="descripcion" field="descripcion" header={pregunta.descripcion}></Column>
                    <Column className="" body={seleccionar}></Column>
                </DataTable>
            </div>
            <div className="buttonsdiv">
                <div>
                    {mensajeDeError && <span className="validacion-opciones">Debe seleccionar solo una opcion</span>}
                </div>
                <div className="buttons">
                    <Button label="Aceptar" className="p-button-rounded p-button-success" onClick={() => aceptar()} />
                    <Button label="Cancelar" className="p-button-rounded p-button-danger" onClick={() => cancelar()} />
                </div>
            </div>
            <Dialog header="¡ Felicitaciones !" visible={displaySuccess} style={{ width: '50vw' }} onHide={() => cerrarPantallaSuccess()}>
                <span className="congratulations">Usted ha respondido correctamente</span><br />
                <span className="congratulations">Puntos sumados: {pregunta.puntos}</span><br />
                <span className="congratulations">Puntos totales: {usuarioService.userLogged.puntaje}</span>
            </Dialog>
            <Dialog header="Incorrecto" visible={displayInactive} style={{ width: '50vw' }} onHide={() => cerrarPantallaInactiva()}>
                <span className="no-active">Su respuesta es correcta</span><br />
                <span className="no-active">pero la pregunta respondida esta inactiva</span><br />
                <span className="no-active">No ha sumado puntos</span><br />
                <span className="no-active">Puntos totales: {usuarioService.userLogged.puntaje}</span>
            </Dialog>
            <Dialog header="Incorrecto" visible={displayIncorrect} style={{ width: '50vw' }} onHide={() => cerrarPantallaIncorrect()}>
                <span className="no-congratulations">Su respuesta es incorrecta</span><br />
                <span className="no-congratulations">No ha sumado puntos</span><br />
                <span className="no-congratulations">Puntos totales: {usuarioService.userLogged.puntaje}</span>
            </Dialog>
            <Toast ref={toast} />
        </div>
    )
}
export default Table