export default class Pregunta {
    constructor(id, descripcion) {
        this.id = id
        this.descripcion = descripcion
    }

    static fromJson(preguntaJSON) {
        return Object.assign(new Pregunta(), preguntaJSON)
    }
}