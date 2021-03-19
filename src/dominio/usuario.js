export default class Usuario {
    constructor(id, nombre, apellido, puntaje, userName, password, fechaDeNacimiento) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.puntaje = puntaje
        this.userName = userName
        this.password = password
        this.fechaDeNacimiento = fechaDeNacimiento
    }

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(), usuarioJSON)
    }
}