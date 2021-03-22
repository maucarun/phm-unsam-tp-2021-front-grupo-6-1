export default class Usuario {
    constructor(id, nombre, apellido, puntaje, userName, password, fechaDeNacimiento, preguntasRespondidas) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.fechaDeNacimiento = fechaDeNacimiento
        this.userName = userName
        this.password = password
        this.amigos = new Set()
        this.puntaje = puntaje
        this.preguntasRespondidas = new Set()
    }

    static fromJson(usuarioJSON) {

        return Object.assign(new Usuario(), usuarioJSON,
        {fechaDeNacimiento : convertirADate(usuarioJSON.fechaDeNacimiento)})
    }

    toJSON() {
        return {
          ...this,
        }
      }
}

export function convertirADate(fecha) {
  var parts = fecha.split('-')
  return new Date(parts[0],parts[1]-1,parts[2])
}