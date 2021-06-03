import Usuario from '../dominio/usuario'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class UsuarioService {
    userLogged

    async loguearUsuario(jsonDataLogin) {
        const { data } = await axios.post(`${REST_SERVER_URL}/usuario/login`, jsonDataLogin)
        return Usuario.fromJson(data)
    }

    async getUsuario(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuario/${id}`)
        return Usuario.fromJsonPerfil(data)
    }

    async actualizarUsuario(userId, preguntaId, opcionJson) {
        const { data } =  await axios.put(`${REST_SERVER_URL}/usuario/${userId}/pregunta/${preguntaId}`, opcionJson)
        return data
    }

    async getNoAmigos() {
        const id = this.userLogged.id
        const { data } = await axios.get(`${REST_SERVER_URL}/usuario/${id}/noAmigos`)
        return data.map(noAmigo => Usuario.fromJson(noAmigo))
    }

    async agregarAmigo(nuevoAmigo) {
        const id = this.userLogged.id
        const { data } = await axios.put(`${REST_SERVER_URL}/usuario/${id}/agregarAmigo/${nuevoAmigo.id}`)
        return Usuario.fromJsonPerfil(data)
    }

    async modificarUsuario(usuario) {
        return await axios.put(`${REST_SERVER_URL}/usuario/${usuario.id}`, usuario.toJSON())
    }

}
export const usuarioService = new UsuarioService()
