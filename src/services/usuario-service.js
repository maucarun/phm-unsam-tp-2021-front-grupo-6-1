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

    async getNoAmigos() {
        const id = this.userLogged.id
        const { data } = await axios.get(`${REST_SERVER_URL}/usuarios/noAmigos/${id}`)
        return data.map(noAmigo => Usuario.fromJson(noAmigo))
    }

    async agregarAmigo(nuevoAmigo) {
        const id = this.userLogged.id
        const { data } = await axios.put(`${REST_SERVER_URL}/usuarios/${id}/agregarAmigo/${nuevoAmigo.id}`)
        return Usuario.fromJson(data) 
    }

    
}
export const usuarioService = new UsuarioService()
