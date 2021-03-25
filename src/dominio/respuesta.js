export default class Respuesta {
  constructor(pregunta, puntos, fechaRespuesta, respuestaCorrecta) {
    this.pregunta = pregunta
    this.puntos = puntos
    this.fechaRespuesta = fechaRespuesta
    this.respuestaCorrecta = respuestaCorrecta
  }

  static fromJson(respuestaJSON) {
    return Object.assign(new Respuesta(), respuestaJSON)
  }

  toJSON() {
    return {
      ...this,
    }
  }
}
