import Usuario from "../dominio/usuario";

export default class Pregunta {
  constructor(id, descripcion, opciones, respuestaCorrecta, autor, puntos, type) {
    this.id = id
    this.descripcion = descripcion
    this.opciones = opciones
    this.respuestaCorrecta = respuestaCorrecta
    this.autor = new Usuario(autor)
    this.puntos = puntos
    this.type = type
  }

  static fromJson(preguntaJSON) {
    return Object.assign(new Pregunta(), preguntaJSON)
  }

  toJSON() {
    return {
      ...this,
    }
  }
}