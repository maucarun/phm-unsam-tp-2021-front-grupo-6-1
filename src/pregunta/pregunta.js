import React, { Component } from "react";
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
import '../table/table.css'

class PreguntaPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pregunta: new Pregunta(),
            descripcionPregunta: '',
            opciones: [],
            usuario: new Usuario(),
            mensajeDeError: false,
            nuevaOpcionVacia: false,
            nuevaOpcion: '',
            autor: '',
            nueva: false,
            tipo: ''
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
            this.state.usuario = await usuarioService.getUsuario(usuarioService.userLogged.id);
            const idPregunta = this.props.match.params.id
            if (idPregunta == "nueva") {
                console.log("creo nueva")
                this.setState({
                    autor: this.state.usuario.nombre + ' ' + this.state.usuario.apellido,
                    //id: 0
                    nueva: true,
                })
                console.log("creo nueva2")
            }
            else {
                console.log("edicion")
                const pregunta = await preguntaService.getPregunta(idPregunta)
                this.setState({
                    pregunta: pregunta,
                    descripcionPregunta: pregunta.descripcion,
                    tipo: pregunta.type,
                })
                this.convertirOpciones(this.state.pregunta.opciones)
                console.log(this.mapearTipo(this.state.tipo))
            }
        } catch (e) {
            //console.log("fallo2")
        }
    }

    seleccionarTipo(e) {
        this.setState({ tipo: e.value });
    }

    mapearTipo(tipo) {
        const tipa = (this.selectItems.find(t => t.value == tipo))
        return tipa.label
    }

    convertirOpciones = (options) => {
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
            <Button icon="pi pi-trash" onClick={() => this.eliminarOpcion(opcion.descripcion)}></Button>
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

    aceptar = async () => {
        if (this.soloUnaOpcionSeleccionada()) {
            this.setState(
                { mensajeDeError: false }
            )
            const opcionCorrecta = this.state.opciones.find(op => op.elegida == true)
            this.state.pregunta.respuestaCorrecta = opcionCorrecta.descripcion
            this.state.pregunta.descripcion = this.state.descripcionPregunta
            this.state.pregunta.opciones = this.desconvertirOpciones(this.state.opciones)
            await preguntaService.actualizarPregunta(this.state.pregunta)
            this.props.history.push("/busqueda")
        } else {
            this.setState(
                { mensajeDeError: true }
            )
        }
    }

    crear = async () => {
        if (this.soloUnaOpcionSeleccionada()) {
            this.setState(
                { mensajeDeError: false }
            )
            const opcionCorrecta = this.state.opciones.find(op => op.elegida == true)
            this.state.pregunta.respuestaCorrecta = opcionCorrecta.descripcion
            this.state.pregunta.descripcion = this.state.descripcionPregunta
            this.state.pregunta.opciones = this.desconvertirOpciones(this.state.opciones)
            this.state.pregunta.autor = this.state.usuario
            this.state.pregunta.tipo = this.state.tipo
            await preguntaService.nuevaPregunta(this.state.pregunta)
            this.props.history.push("/busqueda")
        } else {
            this.setState(
                { mensajeDeError: true }
            )
        }
    }

    cancelar = () => {
        this.props.history.push("/busqueda")
    }

    soloUnaOpcionSeleccionada = () => {
        const opcionesSeleccionadas = this.state.opciones.filter(op => op.elegida === true)
        return opcionesSeleccionadas.length === 1
    }

    clearInput() {
        this.opcion.value = "";
    }

    render() {
        return (
            <div className="preguntaBody">
                {this.state.nueva && <span className="autor">Autor: {this.state.autor}</span>}
                {!this.state.nueva && <span className="autor">Autor: {this.state.pregunta.autor.nombre} {this.state.pregunta.autor.apellido}</span>}
                <section className="encabezado">
                    <div className="tituloPregunta">
                        <InputText className="descripcionPregunta" value={this.state.descripcionPregunta} onChange={(e) => this.setState({ descripcionPregunta: e.target.value })} />
                    </div>
                </section>

                <div className="tipoPregunta">
                    <h2>Tipo de Pregunta</h2>
                    <div className="dropdown">
                        {this.state.nueva && <Dropdown value={this.state.tipo} options={this.selectItems} onChange={this.seleccionarTipo} placeholder="Opciones" />}
                    </div>
                    {/* {!this.state.nueva && <div>{this.mapearTipo(this.state.tipo)}</div>} */}
                </div>

                <div>

                    <div className="opciones">
                        <DataTable className="table" value={this.state.opciones} scrollable scrollHeight="300px" >
                            <Column field="descripcion" style={{ width: '80%' }} ></Column>
                            <Column body={this.seleccionarOpcion} style={{ width: '10%' }}></Column>
                            <Column body={this.borrarOpcion} style={{ width: '10%' }}></Column>
                        </DataTable>
                    </div>

                    <div className="label">
                        <h5>Nueva opción</h5>
                        {this.state.nuevaOpcionVacia && <div className="validacion-opciones">La nueva opcion no puede estar vacía</div>}
                        <div className="agregar">
                            <section className="agregarOpcion">
                                <InputText className="agregarOpcion" onChange={(e) => this.setState({ nuevaOpcion: e.target.value })} ref={(el) => (this.opcion = el)} />
                            </section>
                            <section>
                                <Button label="Agregar" className="p-button-primary" onClick={() => this.agregarOpcion(this.state.nuevaOpcion)} />
                            </section>
                        </div>
                    </div>

                    <div className="buttonsdiv">
                        <div>
                            {this.state.mensajeDeError && <span className="validacion-opciones">Debe seleccionar solo una opción</span>}
                        </div>
                        <div className="buttons">
                            {this.state.nueva && <Button label="Aceptar" className="p-button-primary" onClick={() => this.crear()} />}
                            {!this.state.nueva && <Button label="Aceptar" className="p-button-primary" onClick={() => this.aceptar()} />}
                            <Button label="Cancelar" className="p-button-secondary" onClick={() => this.cancelar()} />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default PreguntaPage;
