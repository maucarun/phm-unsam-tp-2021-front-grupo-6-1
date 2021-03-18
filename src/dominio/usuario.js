export default class Usuario {
    constructor(id, nombreYApellido, userName, password) {
        this.id = id
        this.nombreYApellido = nombreYApellido
        this.userName = userName
        this.password = password
    }

    static fromJson(usuarioJSON) {
        return Object.assign(new Usuario(), usuarioJSON)
    }
}