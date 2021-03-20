import Pregunta from '../dominio/pregunta'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class PreguntaService {

    async getPregunta(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/${id}`)
        return Pregunta.fromJson(data)
    }

    async getPreguntas(valorBusqueda) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/${valorBusqueda}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async allInstances() {
        const {data} = await axios.get(`${REST_SERVER_URL}/preguntasAll`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async actualizarPregunta(pregunta) {
        return await axios.put(`${REST_SERVER_URL}/pregunta/${pregunta.id}`, pregunta.toJSON())
    }

}
export const preguntaService = new PreguntaService()