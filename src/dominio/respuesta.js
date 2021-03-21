export default class Respuesta {
  constructor(pregunta, puntos, fechaRespuesta) {
    this.pregunta = pregunta
    this.puntos = puntos
    this.fechaRespuesta = fechaRespuesta
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
