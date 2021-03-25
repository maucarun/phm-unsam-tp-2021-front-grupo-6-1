export default class Usuario {
    constructor(id, nombre, apellido, puntaje, userName, password, fechaDeNacimiento, respuestas) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.fechaDeNacimiento = fechaDeNacimiento
        this.userName = userName
        this.password = password
        this.amigos = new Set()
        this.puntaje = puntaje
        this.respuestas = respuestas
    }

    validar() {
      if(this.nombre == "") {
        throw new Error("Debe ingresar Nombre")
      }
      if(this.apellido=="") {
        throw new Error("Debe ingresar Apellido")
      }
      if(this.fechaDeNacimiento>new Date()) {
        throw new Error("Fecha de nacimiento incorrecta")

      }
    }

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(), usuarioJSON)
    }

    toJSON() {
        return {
          ...this,
        }
      }
}