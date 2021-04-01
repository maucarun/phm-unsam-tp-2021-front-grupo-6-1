import Pregunta from '../dominio/pregunta'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { usuarioService } from "../services/usuario-service";

class PreguntaService {

    async getPregunta(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/${id}`)
        return Pregunta.fromJson(data)
    }

    async getPreguntas(valorBusqueda, soloActivas, userId) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/${valorBusqueda}/${soloActivas}/${userId}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async allInstances(soloActivas,userId) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntasAll/${soloActivas}/${userId}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async actualizarPregunta(pregunta) {
        const data = { type: pregunta.type, respuestaCorrecta: pregunta.respuestaCorrecta, 
                        descripcion: pregunta.descripcion, opciones: pregunta.opciones }
        return await axios.put(`${REST_SERVER_URL}/pregunta/${pregunta.id}`, data)
    }

    async nuevaPregunta(pregunta) {
        const data = { type: pregunta.type, respuestaCorrecta: pregunta.respuestaCorrecta, 
            descripcion: pregunta.descripcion, opciones: pregunta.opciones,
            puntos: pregunta.puntos, fechaHoraCreacion: pregunta.fechaHoraCreacion }
            console.log(data)
        await axios.post(`${REST_SERVER_URL}/${usuarioService.userLogged.id}/pregunta`, data)
    }
}
export const preguntaService = new PreguntaService()