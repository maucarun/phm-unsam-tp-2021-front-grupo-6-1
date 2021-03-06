import Usuario from "../dominio/usuario";

export default class Pregunta {
  constructor(id, autorId, descripcion, opciones, nombreApellidoAutor, puntos, type) {
    this.id = id
    this.autorId = autorId
    this.descripcion = descripcion
    this.opciones = opciones
    this.nombreApellidoAutor = nombreApellidoAutor
    this.puntos = puntos
    this.type = type
  }

  static fromJson(preguntaJSON) {
    return Object.assign(new Pregunta(), preguntaJSON, { activa: preguntaJSON.estaActiva })
  }

  toJSON() {
    return {
      ...this,
    }
  }
}