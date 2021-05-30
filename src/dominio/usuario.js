export default class Usuario {
  constructor(id, nombre, apellido, puntaje, userName, fechaDeNacimiento, respuestas) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.fechaDeNacimiento = fechaDeNacimiento
    this.userName = userName
    this.amigos = new Set()
    this.puntaje = puntaje
    this.respuestas = respuestas
  }

  validar() {
    if (this.nombre == "") {
      throw new Error("Debe ingresar Nombre")
    }
    if (this.apellido == "") {
      throw new Error("Debe ingresar Apellido")
    }
    if (this.fechaDeNacimiento > new Date()) {
      throw new Error("Fecha de nacimiento incorrecta")

    }
  }

  static fromJson(usuarioJSON) {
    return Object.assign(new Usuario(), usuarioJSON)
  }

  static fromJsonPerfil(usuarioJSON, respuestasJSON) {
    return Object.assign(new Usuario(), usuarioJSON, { fechaDeNacimiento: convertirADate(usuarioJSON.fechaDeNacimiento) }, { respuestas: respuestasJSON })
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaDeNacimiento: this.fechaDeNacimiento.toISOString().split("T")[0]
    }
  }

}

function convertirADate(fecha) {
  var parts = fecha.split('-')
  return new Date(parts[0], parts[1] - 1, parts[2])
}