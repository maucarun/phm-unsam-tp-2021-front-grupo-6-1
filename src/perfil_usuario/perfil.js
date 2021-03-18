import { Component } from "react";
import "./perfil.css";
import { InputText } from "primereact/inputtext";
import Usuario from "../dominio/usuario";
import { usuarioService } from "../services/usuario-service";

class Perfil extends Component {
  constructor(props) {
    const usuario = new Usuario(1, "Richard", "Gere", 135)
    super(props);
    this.state = {
      usuario: usuario,
    };
  }

  setNombre(nombre_usuario){
    const usuario = this.state.usuario
    usuario.nombre = nombre_usuario
    this.cambiarEstado(usuario)
  }

  cambiarEstado = (usuario) => {
    // const newUsuario = Object.assign(usuario)
    this.setState({
      usuario:usuario,
    })
  }

  render() {
    return (
      <div className="card">
        <section className="encabezado">
          <h1>{this.state.usuario.nombre}</h1>
          <h1>{this.state.usuario.puntaje}</h1>
        </section>
        <h5>Nombre</h5>
        <InputText value={this.state.usuario.nombre}
          onChange={(event) => this.setNombre(event.target.value)}
        />
        <section></section>
      </div>
    );
  }
}

export default Perfil;
