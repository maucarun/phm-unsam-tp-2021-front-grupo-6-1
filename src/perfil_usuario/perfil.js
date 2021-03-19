import { Component } from "react";
import "./perfil.css";
import { InputText } from "primereact/inputtext";
import Usuario from "../dominio/usuario";
import { usuarioService } from "../services/usuario-service";
import { Calendar } from 'primereact/calendar';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario:[],
    };
  }
 
  async componentDidMount() {
    try {
      const usuario = await usuarioService.getUsuario(usuarioService.userLogged.id)
      console.dir(usuario)
      this.cambiarEstado(usuario)
    }catch(e) {
      //this.addMessages(e)
    }
  }

  setNombre(nombre_usuario){
    const usuario = this.state.usuario
    usuario.nombre = nombre_usuario
    this.cambiarEstado(usuario)
  }

  cambiarEstado(usuario) {
    this.setState({
      usuario:usuario,
    })
  }

  setApellido(apellido_usuario) {
    const usuario = this.state.usuario
    usuario.apellido = apellido_usuario
    this.cambiarEstado(usuario)
  }



  render() {
    return (
      <div className="card">
        <section className="encabezado">
          <h1>{this.state.usuario.nombre} {this.state.usuario.apellido}</h1>
          <h1>{this.state.usuario.puntaje} Puntos</h1>
        </section>
        <section className="inputs1">
        <h5>Nombre</h5>
        <InputText value={this.state.usuario.nombre}
          onChange={(event) => this.setNombre(event.target.value)}
        />
        <h5>Apellido</h5>
        <InputText value={this.state.usuario.apellido}
          onChange={(event) => this.setApellido(event.target.value)}
          />
          </section>
          <section>
            <h5>Nacimiento</h5>
            <Calendar value={this.state.usuario.fechaDeNacimiento} onChange={(e) => setDate(e.value)} showIcon></Calendar>
          </section>
        
        
        <section></section>
      </div>
    );
  }
}

export default Perfil;
