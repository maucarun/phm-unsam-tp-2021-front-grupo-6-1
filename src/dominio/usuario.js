export default class Usuario {
    constructor(id, nombre, apellido, puntaje, userName, password) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.puntaje = puntaje
        this.userName = userName
        this.password = password
    }

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(), usuarioJSON)
    }
}