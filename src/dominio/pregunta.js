import Usuario from "../dominio/usuario";

export default class Pregunta {
  constructor(id, descripcion, opciones, nombreAutor, apellidoAutor, userNameAutor, puntos, type) {
    this.id = id
    this.descripcion = descripcion
    this.opciones = opciones
    this.nombreAutor = nombreAutor
    this.apellidoAutor = apellidoAutor
    this.userNameAutor = userNameAutor
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