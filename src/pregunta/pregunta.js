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
            usuario: new Usuario(),
            tipoSeleccionado: null,
            mensajeDeError: false,
            nuevaOpcionVacia: false,
            opciones: [],
            nuevaOpcion: '',
        };

        this.selectItems = [
            { label: 'Simple', value: 'Simple' },
            { label: 'Riesgo', value: 'Riesgo' },
            { label: 'Solidaria', value: 'Solidaria' },
        ];

        this.seleccionarTipo = this.seleccionarTipo.bind(this);
    }

    async componentDidMount() {
        try {
            this.state.usuario = await usuarioService.getUsuario(usuarioService.userLogged.id);
        } catch (e) {
            console.log("fallo1")
        }
        try {
            const pregunta = await preguntaService.getPregunta(this.props.match.params.id)
            this.setState({
                pregunta: pregunta,
            })
            console.log(this.state.pregunta)
            console.log(this.state.pregunta.autor)
            this.convertirOpciones(this.state.pregunta.opciones)
        } catch (e) {
            console.log("fallo2")
        }
    }

    seleccionarTipo(e) {
        this.setState({ tipoSeleccionado: e.value });
    }

    convertirOpciones = (options) => {
        const opcionesConvertidas = []
        options.forEach(op => {
            opcionesConvertidas.push({ descripcion: op, elegida: false })
        })
        this.setOpciones(opcionesConvertidas)
        console.log(this.state.opciones)
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
            <Checkbox className="chckbx" onChange={() => setChckbx(opcion)} checked={opcion.elegida}></Checkbox>
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
        setOpciones(updatedOptions)
    }

    aceptar = async () => {
        if (soloUnaOpcionSeleccionada()) {
            this.setState(
                { mensajeDeError: false }
            )
            usuarioService.userLogged.preguntasRespondidas.push(pregunta)
            await usuarioService.actualizarUsuario(usuarioService.userLogged)
            this.props.history.push("/busqueda")
        } else {
            this.setState(
                { mensajeDeError: true }
            )
        }
    }

    cancelar = () => {
        this.props.history.push(`/pregunta/${this.props.match.params.id}`)
    }

    soloUnaOpcionSeleccionada = () => {
        const opcionesSeleccionadas = opciones.filter(op => op.elegida === true)
        return opcionesSeleccionadas.length === 1
    }

    clearInput() {
        this.opcion.value = "";
    }

    render() {
        return (
            <div className="preguntaBody">
                <section className="encabezado">
                    <span className="autor">Autor: {this.state.pregunta.autor.nombre} {this.state.pregunta.autor.apellido}</span>
                    <h1>
                        {this.state.pregunta.descripcion}
                    </h1>
                </section>

                <div className="tipoPregunta">
                    <h2>Tipo de Pregunta</h2>
                    <div className="dropdown">
                        <Dropdown value={this.state.tipoSeleccionado} options={this.selectItems} onChange={this.seleccionarTipo} placeholder="Opciones" />
                    </div>
                </div>

                <div>

                    <div className="opciones">
                        <DataTable value={this.state.opciones} autoLayout={true}>
                            <Column className="desc" field="descripcion" ></Column>
                            <Column body={this.seleccionarOpcion}></Column>
                            <Column body={this.borrarOpcion}></Column>
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
                            <Button label="Aceptar" className="p-button-primary" onClick={() => this.aceptar()} />
                            <Button label="Cancelar" className="p-button-secondary" onClick={() => this.cancelar()} />
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default PreguntaPage;
