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

    async allInstances(soloActivas, userId) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntasAll/${soloActivas}/${userId}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async actualizarPregunta(pregunta) {
        return await axios.put(`${REST_SERVER_URL}/pregunta/${pregunta.id}`, pregunta)
    }

    async nuevaPregunta(pregunta) {
        await axios.post(`${REST_SERVER_URL}/${usuarioService.userLogged.id}/pregunta`, pregunta)
    }
}
export const preguntaService = new PreguntaService()