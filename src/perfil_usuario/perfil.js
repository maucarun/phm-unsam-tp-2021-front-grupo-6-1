import { Component, createRef } from "react";
import "./perfil.css";
import { InputText } from "primereact/inputtext";
import Usuario from "../dominio/usuario";
import { usuarioService } from "../services/usuario-service";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';
import { preguntaService } from "../services/pregunta-service";

class Perfil extends Component {
  
  toast = createRef()
  
  constructor(props) {
    super(props);
    this.state = {
      usuario: new Usuario(),
      mostrarModal: false,
      noAmigos:[],
      noAmigoSeleccionado: null,
      modificaciones : []
    };
  }

  async componentDidMount() {
    try {
      const usuario = await usuarioService.getUsuario(usuarioService.userLogged.id);
      const modificaciones = await preguntaService.getPreguntasModificadas(usuarioService.userLogged.id)
      //console.dir(usuario)
      this.cambiarEstado(usuario);
      this.setState({
        modificaciones: modificaciones,
      })
      } catch (e) {
        //this.addMessages(e)
      }
  }
  
  setNombre(nombre_usuario) {
    const usuario = this.state.usuario;
    usuario.nombre = nombre_usuario;
    this.cambiarEstado(usuario);
  }

  cambiarEstado(usuario) {
    this.setState({
      usuario: usuario,
    });
  }

  setApellido(apellido_usuario) {
    const usuario = this.state.usuario;
    usuario.apellido = apellido_usuario;
    this.cambiarEstado(usuario);
  }

  setFechaDeNacimiento(fecha_nacimiento) {
    const usuario = this.state.usuario;
    usuario.fechaDeNacimiento = fecha_nacimiento;
    this.cambiarEstado(usuario);
  }

  async agregar() {
    try {
      const noAmigos = await usuarioService.getNoAmigos();
      this.setState({noAmigos: noAmigos , mostrarModal: true});
    } catch (e) {
      console.log(e)
      //this.addMessages(e)
    }
  }

  cerrar() {
    this.setState({ mostrarModal: false });
  }

  nombreYApellidoAmigo(amigoString) {
   return amigoString
  }

  nombreYApellidoNoAmigo(amigo) {
    return amigo.nombre  + " " + amigo.apellido
   }

   setNoAmigo(noAmigo) {
     this.setState({noAmigoSeleccionado: noAmigo})
   }

  agregarAmigo = async () => {
     try {
       await usuarioService.agregarAmigo(this.state.noAmigoSeleccionado)
       const usuarioLogueado = await usuarioService.getUsuario(usuarioService.userLogged.id)
       this.setState({mostrarModal: false, usuario: usuarioLogueado})
       this.toast.current.show({ severity: 'success', summary: "Bien" , detail: "Has agregado un nuevo amigo", life: 3000})
     }catch(e) {
       //this.addMessages(e)
     }
   }

   guardarCambios = async () => {
     try {
       this.state.usuario.validar()
       await usuarioService.modificarUsuario(this.state.usuario)
       this.toast.current.show({ severity: 'success', summary: "Bien" , detail: "Has realizado cambios", life: 3000})
     }catch(e) {
      this.toast.current.show({ severity: 'error', summary: "Error" , detail: e.message, life: 3000})
     }
   }

  cancelar() {
    this.props.history.push('/busqueda')
  }

  opciones(modificacion){
    return modificacion.opcionesNew.join(", ")
  }

  render() {
    return (
      <div className="card">
        <section className="encabezado">
          <h1>
            {this.state.usuario.nombre} {this.state.usuario.apellido}
          </h1>
          <h1>{this.state.usuario.puntaje} Puntos</h1>
        </section>

        <section className="inputs1">
          <h5>Nombre</h5>
          <InputText
            value={this.state.usuario.nombre}
            onChange={(event) => this.setNombre(event.target.value)}
          />
          <h5>Apellido</h5>
          <InputText
            value={this.state.usuario.apellido}
            onChange={(event) => this.setApellido(event.target.value)}
          />
        </section>
        <section className="inputs1">
          <h5>Nacimiento</h5>
          <Calendar
            value={this.state.usuario.fechaDeNacimiento}
            onChange={(event) => this.setFechaDeNacimiento(event.value)}
            showIcon
          ></Calendar>
          <h5>Amigos</h5>
          <Button
            label="Agregar"
            className="p-button-rounded p-button-Primary"
            onClick={() => this.agregar()}
          />
        </section>

        <Dialog
          header="Personas que quizas conozcas"
          visible={this.state.mostrarModal}
          style={{ width: "50vw" }}
          // footer={renderFooter("displayBasic")}
          onHide={() => this.cerrar()}
          baseZIndex={1000}
        >
          <section className="tabla-popup">
          <DataTable value={this.state.noAmigos} scrollable scrollHeight="100px" selection={this.state.noAmigoSeleccionado} onSelectionChange={evento => this.setNoAmigo(evento.value)}>
          <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
            <Column body={this.nombreYApellidoNoAmigo} header="Cuantos mas amigos agregas mas preguntas tendras">
            </Column>
          </DataTable>
          <section className="centrar">
          <Button onClick={this.agregarAmigo} label="Guardar" className="p-button-rounded p-button-help" />
          </section>
          </section>
        </Dialog>

        <section className="tabla-amigos">
          <DataTable value={this.state.usuario.amigos} scrollable scrollHeight="100px">
            <Column body={this.nombreYApellidoAmigo} header="Mis Amigos"></Column>
          </DataTable>
        </section>

        <section className="tabla-respuestas">
          <h3>Preguntas Respondidas</h3>
          <DataTable value={this.state.usuario.respuestas} scrollable scrollHeight="200px">
            <Column field="pregunta" header="Preguntas"></Column>
            <Column field="fechaRespuesta" header="Fecha de respuesta"></Column>
            <Column field="puntos" header="Puntos"></Column>
          </DataTable>
        </section>

        <section className="tabla-respuestas">
          <h3>Preguntas Modificadas</h3>
          <DataTable value={this.state.modificaciones} scrollable scrollHeight="200px">
            <Column field="fecha" header="Fecha Modificacion"></Column>
            {/* <Column field="preguntaOld" header="pregunta vieja"></Column> */}
            <Column field="preguntaNew" header="pregunta nueva"></Column>
            {/* <Column field="respuestaCorrectaOld" header="Respuesta vieja"></Column> */}
            <Column field="respuestaCorrectaNew" header="Respuesta nueva"></Column>
            {/* <Column field="opcionesOld" header="Opciones vieja"></Column> */}
            <Column body={this.opciones} header="Opciones actuales"></Column>

          </DataTable>
        </section>

        <section className="botonera">
        <Button label="Aceptar" onClick={()=> this.guardarCambios()} className="p-button-rounded p-button-success" />
        <Button label="Cancelar" onClick={() => this.cancelar()} className="p-button-rounded p-button-danger" />
        </section>
        <Toast ref={this.toast} />
      </div>
    );
  }
}

export default Perfil;
