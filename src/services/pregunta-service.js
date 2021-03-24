import Pregunta from '../dominio/pregunta'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class PreguntaService {

    async getPregunta(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/${id}`)
        return Pregunta.fromJson(data)
    }

    async getPreguntas(valorBusqueda, soloActivas) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/${valorBusqueda}/${soloActivas}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async allInstances(soloActivas) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntasAll/${soloActivas}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async actualizarPregunta(pregunta) {
        return await axios.put(`${REST_SERVER_URL}/pregunta/${pregunta.id}`, pregunta.toJSON())
    }

    async crearPregunta(pregunta) {
        return await axios.post(`${REST_SERVER_URL}/nuevaPregunta`, pregunta.toJSON())
    }

}
export const preguntaService = new PreguntaService()