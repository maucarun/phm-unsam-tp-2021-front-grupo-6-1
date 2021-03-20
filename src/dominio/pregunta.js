export default class Pregunta {
    constructor(id, descripcion, opciones, respuestaCorrecta) {
        this.id = id
        this.descripcion = descripcion
        this.opciones = opciones
        this.respuestaCorrecta = respuestaCorrecta
    }

    static fromJson(preguntaJSON) {
        return Object.assign(new Pregunta(), preguntaJSON)
    }
}