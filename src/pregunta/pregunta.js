import React, { Component, createRef } from "react";
import "./pregunta.css";
import { InputText } from "primereact/inputtext";
import Pregunta from "../dominio/pregunta";
import Usuario from "../dominio/usuario";
import { preguntaService } from "../services/pregunta-service";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { usuarioService } from "../services/usuario-service";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import '../table/table.css'

class PreguntaPage extends Component {

    toast = createRef()

    constructor(props) {
        super(props);
        this.state = {
            usuario: new Usuario(),
            pregunta: new Pregunta(),
            nueva: false,
            descripcion: '',
            opciones: [],
            nuevaOpcion: '',
            nuevaOpcionVacia: false,
            tipo: '',
            tipoLabel: '',
            puntos: 0,
            mensajeDeError: false,
        };

        this.selectItems = [
            { label: 'Simple', value: 'simple' },
            { label: 'De riesgo', value: 'deRiesgo' },
            { label: 'Solidaria', value: 'solidaria' },
        ];

        this.seleccionarTipo = this.seleccionarTipo.bind(this);
    }

    async componentDidMount() {
        try {
            const usuario = await usuarioService.getUsuario(usuarioService.userLogged.id);
            this.setState({ usuario })
            const idPregunta = this.props.match.params.id
            if (idPregunta == "nueva") {
                this.setState({ nueva: true })
            }
            else {
                const pregunta = await preguntaService.getPreguntaEdicion(idPregunta)
                this.setState({
                    pregunta,
                    descripcion: pregunta.descripcion,
                    puntos: pregunta.puntos,
                })
                this.convertirOpciones()
                this.setState({ tipoLabel: this.mapearTipo() })
            }
        } catch (error) {
            this.toast.current.show({ severity: 'error', summary: 'Ocurrió un error al cargar la pregunta', detail: error.message, life: 3000 })
        }
    }

    seleccionarTipo(e) {
        this.setState({ tipo: e.value });
    }

    esSolidaria() {
        return this.state.tipo == 'solidaria' || this.state.pregunta.type == 'solidaria'
    }

    mapearTipo() {
        const tipo = this.state.pregunta.type
        const tipoLabel = this.selectItems.find(t => t.value == tipo)
        return tipoLabel.label
    }

    convertirOpciones = () => {
        const options = this.state.pregunta.opciones
        const opcionesConvertidas = []
        options.forEach(op => {
            opcionesConvertidas.push({ descripcion: op, elegida: false })
        })
        opcionesConvertidas.forEach(op => {
            if (op.descripcion == this.state.pregunta.respuestaCorrecta) {
                op.elegida = true
            }
        })
        this.setOpciones(opcionesConvertidas)
    }

    desconvertirOpciones = (options) => {
        const opcionesDesconvertidas = []
        options.forEach(op => { opcionesDesconvertidas.push(op.descripcion) })
        return opcionesDesconvertidas
    }

    setOpciones(options) {
        this.setState({
            opciones: options,
        })
    }

    agregarOpcion(opcion) {
        if (opcion == null || opcion == '') {
            this.setState(
                {
                    nuevaOpcionVacia: true,
                }
            )
        }
        else {
            const nuevaOpcion = { descripcion: opcion, elegida: false }
            this.setState(
                {
                    opciones: [...this.state.opciones, nuevaOpcion],
                    nuevaOpcion: '',
                    nuevaOpcionVacia: false,
                }
            )
            this.clearInput()
        }
    }

    eliminarOpcion(descripcion) {
        const opciones = this.state.opciones.filter(opcion => opcion.descripcion !== descripcion);
        this.setState({ opciones: opciones });
    }

    seleccionarOpcion = (opcion) => {
        return (
            <Checkbox className="chckbx" onChange={() => this.setChckbx(opcion)} checked={opcion.elegida}></Checkbox>
        )
    }

    borrarOpcion = (opcion) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => this.eliminarOpcion(opcion.descripcion)}></Button>
        )
    }

    setChckbx = (opcion) => {
        const updatedOptions = this.state.opciones.map(op => {
            if (opcion.descripcion === op.descripcion) {
                op.elegida = !op.elegida
            }
            return op
        })
        this.setOpciones(updatedOptions)
    }

    descripcionVacia() {
        return this.state.descripcion == '' || this.state.descripcion == ' ' || this.state.descripcion == null
    }

    tipoNoSeleccionado() {
        return this.state.tipo == '' || this.state.tipo == ' ' || this.state.tipo == null
    }

    puntosVacios() {
        return this.state.puntos == '' || this.state.puntos == ' ' || this.state.puntos == null
    }

    puntosValidos() {
        if (!this.esSolidaria()) {
            return true
        } else {
            return (this.state.puntos >= 1 && this.state.puntos <= this.state.usuario.puntaje && !this.puntosVacios())
        }
    }

    aceptar = async () => {
        if (!this.soloUnaOpcionSeleccionada() || this.descripcionVacia() || !this.puntosValidos() || this.unaSolaOpcion()) {
            this.setState(
                { mensajeDeError: true }
            )
        } else {
            const opcionCorrecta = this.state.opciones.find(op => op.elegida == true)
            const pregunta = {
                id: this.state.pregunta.id,
                respuestaCorrecta: opcionCorrecta.descripcion,
                descripcion: this.state.descripcion,
                opciones: this.desconvertirOpciones(this.state.opciones),
                type: this.state.pregunta.type
            }
            if (this.state.pregunta.type == 'solidaria') {
                pregunta.puntos = parseInt(this.state.puntos)
            }
            try {
                await preguntaService.actualizarPregunta(pregunta)
                this.props.history.push("/busqueda")
            } catch (error) {
                this.toast.current.show({ severity: 'error', summary: 'Ocurrió un error al editar la pregunta', detail: error.message, life: 3000 })
            }
        }
    }

    crear = async () => {
        if (!this.soloUnaOpcionSeleccionada() || this.descripcionVacia() || this.tipoNoSeleccionado() || !this.puntosValidos() || this.unaSolaOpcion()) {
            this.setState(
                { mensajeDeError: true }
            )
        }
        else {
            const opcionCorrecta = this.state.opciones.find(op => op.elegida == true)
            const pregunta = {
                type: this.state.tipo,
                respuestaCorrecta: opcionCorrecta.descripcion,
                descripcion: this.state.descripcion,
                opciones: this.desconvertirOpciones(this.state.opciones),
                fechaHoraCreacion: this.horaActual()
            }
            if (this.state.tipo == 'solidaria') {
                pregunta.puntos = parseInt(this.state.puntos)
            }
            try {
                await preguntaService.nuevaPregunta(pregunta)
                this.props.history.push("/busqueda")
            } catch (error) {
                this.toast.current.show({ severity: 'error', summary: 'Ocurrió un error al crear la pregunta', detail: error.message, life: 3000 })
            }
        }
    }

    horaActual() {
        var date = new Date()
        var horaActual =
            date.getFullYear() + "-" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);
        return horaActual
    }

    cancelar = () => {
        this.props.history.push("/busqueda")
    }

    soloUnaOpcionSeleccionada = () => {
        const opcionesSeleccionadas = this.state.opciones.filter(op => op.elegida === true)
        return opcionesSeleccionadas.length === 1
    }

    unaSolaOpcion() {
        return this.state.opciones.length == 1
    }

    clearInput() {
        this.opcion.value = "";
    }

    render() {
        const { usuario, pregunta, nueva, descripcion, tipo, tipoLabel, opciones, puntos, nuevaOpcion, nuevaOpcionVacia, mensajeDeError } = this.state
        return (
            <div className="preguntaBody">
                {nueva && <span className="autor">Autor: {usuario.nombre + ' ' + usuario.apellido}</span>}
                {!nueva && <span className="autor">Autor: {pregunta.autor.nombre} {pregunta.autor.apellido}</span>}
                <section className="encabezado">
                    <div className="tituloPregunta">
                        <InputText className="descripcionPregunta" value={descripcion} onChange={(e) => this.setState({ descripcion: e.target.value })} />
                    </div>
                </section>
                {mensajeDeError && this.descripcionVacia() && <div className="validacion">El título de la pregunta no puede estar vacío</div>}

                <div className="tipoPregunta">
                    <h2>Tipo de Pregunta</h2>
                    {nueva && <div className="dropdown">
                        <Dropdown value={tipo} options={this.selectItems} onChange={this.seleccionarTipo} placeholder="Opciones" />
                    </div>}
                    {!nueva && <div className="tipo"> {tipoLabel}</div>}
                </div>
                {nueva && mensajeDeError && this.tipoNoSeleccionado() && <div className="validacion-tipo">Debe elegir el tipo de pregunta</div>}

                <div>
                    <div className="opciones">
                        <DataTable className="table" value={opciones} scrollable scrollHeight="300px" >
                            <Column field="descripcion" style={{ width: '80%' }} ></Column>
                            <Column body={this.seleccionarOpcion} style={{ width: '10%' }}></Column>
                            <Column body={this.borrarOpcion} style={{ width: '10%' }}></Column>
                        </DataTable>
                    </div>
                    {mensajeDeError && this.unaSolaOpcion() && <div className="validacion">La pregunta no puede tener sólo una opción</div>}
                    {mensajeDeError && !this.soloUnaOpcionSeleccionada() && <span className="validacion">Debe seleccionar una opción correcta</span>}

                    <div className="label">
                        <h5>Nueva opción</h5>
                        <div className="agregar">
                            <section className="agregarOpcion">
                                <InputText className="agregarOpcion" onChange={(e) => this.setState({ nuevaOpcion: e.target.value })} ref={(el) => (this.opcion = el)} />
                            </section>
                            <section>
                                <Button label="Agregar" className="p-button-rounded p-button-primary" onClick={() => this.agregarOpcion(nuevaOpcion)} />
                            </section>
                        </div>
                    </div>
                    {nuevaOpcionVacia && <div className="validacion">La nueva opcion no puede estar vacía</div>}

                    {this.esSolidaria() &&
                        <div className="puntos">
                            <div className="puntos-texto">Puntos:</div>
                            <InputText value={puntos} onChange={(e) => this.setState({ puntos: e.target.value })} />
                        </div>}
                    {mensajeDeError && !this.puntosValidos() && <div className="validacion-puntos">Puntaje indicado es incorrecto</div>}

                </div>

                <div className="buttonsdiv">
                    <div>
                    </div>
                    <div className="botones">
                        {nueva && <Button label="Aceptar" className="p-button-rounded p-button-success" onClick={() => this.crear()} />}
                        {!nueva && <Button label="Aceptar" className="p-button-rounded p-button-success" onClick={() => this.aceptar()} />}
                        <Button label="Cancelar" className="p-button-rounded p-button-danger" onClick={() => this.cancelar()} />
                    </div>
                </div>
                <Toast ref={this.toast} />
            </div>

        );
    }
}

export default PreguntaPage;
