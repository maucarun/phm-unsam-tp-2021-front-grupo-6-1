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

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(), usuarioJSON)
    }

    toJSON() {
        return {
          ...this,
        }
      }
}