import { Component } from "react";
import "./perfil.css";
import { InputText } from "primereact/inputtext";
import Usuario from "../dominio/usuario";
import { usuarioService } from "../services/usuario-service";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: new Usuario(),
      mostrarModal: false,
    };
  }

  async componentDidMount() {
    try {
      const usuario = await usuarioService.getUsuario(
        usuarioService.userLogged.id
      );
      this.cambiarEstado(usuario);
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

  agregar() {
    this.setState({ mostrarModal: true });
  }

  cerrar() {
    this.setState({ mostrarModal: false });
  }

  nombreYApellido(usuario) {
   return usuario.nombre + " " + usuario.apellido
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
            className="p-button-primary"
            onClick={() => this.agregar()}
          />
        </section>

        <Dialog
          header="Header"
          visible={this.state.mostrarModal}
          style={{ width: "50vw" }}
          // footer={renderFooter("displayBasic")}
          onHide={() => this.cerrar()}
          baseZIndex={1000}
        ></Dialog>

        <section className="tabla">
          <DataTable value={this.state.usuario.amigos} scrollable scrollHeight="100px">
            <Column body={this.nombreYApellido} header="Nombres de Amigos"></Column>
          </DataTable>
        </section>

        <section></section>
      </div>
    );
  }
}

export default Perfil;
