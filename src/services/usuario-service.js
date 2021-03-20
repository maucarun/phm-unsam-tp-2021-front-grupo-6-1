import Usuario from '../dominio/usuario'
import axios from 'axios'
import { REST_SERVER_URL } from './constants'

class UsuarioService {
    userLogged

    /* async allInstances() {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios`)
        return data.map(usuario => Usuario.fromJson(usuario))
    }

    async getContactos(valorBusqueda) {
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios/${valorBusqueda}`)
        return data.map(usuario => Usuario.fromJson(usuario))
    } */

    async loguearUsuario(jsonDataLogin) {
        const { data } = await axios.post(`${REST_SERVER_URL}/login`, jsonDataLogin)
        return Usuario.fromJson(data)
    }

    async getUsuario(id) {
        const { data } = await axios.get(`${REST_SERVER_URL}/perfilDeUsuario/${id}`)
        return Usuario.fromJson(data)
    }

    async actualizarUsuario(user) {
        return await axios.put(`${REST_SERVER_URL}/perfilDeUsuario/${user.id}`, user.toJSON())
    }
}
export const usuarioService = new UsuarioService()