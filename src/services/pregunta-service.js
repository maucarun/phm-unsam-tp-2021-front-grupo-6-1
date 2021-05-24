import Pregunta from '../dominio/pregunta'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'
import { usuarioService } from "../services/usuario-service";

class PreguntaService {

    async getPregunta(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/${id}`)
        return Pregunta.fromJson(data)
    }

    async getPreguntaEdicion(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/pregunta/edicion/${id}`)
        return Pregunta.fromJson(data)
    }

    async getPreguntasActivasPorString(valorBusqueda, idUser) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/activas/${valorBusqueda}/noRespondidasPorUsuario/${idUser}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async getPreguntasPorString(valorBusqueda, idUser) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/all/${valorBusqueda}/noRespondidasPorUsuario/${idUser}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async allInstancesActivas(idUser) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/activas/noRespondidasPorUsuario/${idUser}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async allInstances(idUser) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/all/noRespondidasPorUsuario/${idUser}`)
        return data.map(pregunta => Pregunta.fromJson(pregunta))
    }

    async getPreguntasModificadas(idUser) {
        const { data } = await axios.get(`${REST_SERVER_URL}/preguntas/all/modificadas/${idUser}`)
        return data
    }

    async actualizarPregunta(pregunta) {
        return await axios.put(`${REST_SERVER_URL}/pregunta/${pregunta.id}`, pregunta)
    }

    async nuevaPregunta(pregunta) {
        await axios.post(`${REST_SERVER_URL}/pregunta/${usuarioService.userLogged.id}`, pregunta)
    }
}
export const preguntaService = new PreguntaService()