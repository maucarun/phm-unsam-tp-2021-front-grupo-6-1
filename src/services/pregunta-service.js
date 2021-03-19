import Pregunta from '../dominio/pregunta'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class PreguntaService {

    async getPregunta(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/${id}`)
        return Usuario.fromJson(data)
    }

    async getPreguntas(valorBusqueda) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/${valorBusqueda}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    /*
    async getContactos(valorBusqueda) {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios/${valorBusqueda}`)
        return data.map(usuario => Usuario.fromJson(usuario))
    } */

}
export const preguntaService = new PreguntaService()