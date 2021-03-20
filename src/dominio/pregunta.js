export default class Pregunta {
    constructor(id, descripcion, opciones) {
        this.id = id
        this.descripcion = descripcion
        this.opciones = opciones
    }

    static fromJson(preguntaJSON) {
        return Object.assign(new Pregunta(), preguntaJSON)
    }
}