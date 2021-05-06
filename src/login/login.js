import React, { Component, createRef } from "react"
import { Card } from 'primereact/card'
import "./login.css"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { usuarioService } from '../services/usuario-service'
import { Toast } from 'primereact/toast';

export class Login extends Component {

    toast = createRef()

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }

    setearUserName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    setearPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    loguearUsuario = async () => {
        const jsonDataLogin = { userName: this.state.userName, password: this.state.password }
        try {
            usuarioService.userLogged = await usuarioService.loguearUsuario(jsonDataLogin)
            this.props.history.push('/busqueda')
        } catch (e) {
            e.response ?
                this.toast.current.show({ severity: 'error', summary: e.response.data.message, detail: e.message, life: 3000 })
                : this.toast.current.show({ severity: 'error', summary: "Error de conexión", detail: e.message, life: 3000 })
        }
    }

    render() {
        return (
            <div className="centrado">
                <Card className="cardLogin">
                    <div className="titulo">Pregunta3!</div>
                    <div className="p-fluid">
                        <span className="p-float-label margin-top">
                            <InputText id="in" value={this.state.userName} onChange={this.setearUserName} data-testid="username" />
                            <label htmlFor="in">Usuario</label>
                        </span>
                        <span className="p-float-label margin-top">
                            <Password id="password" value={this.state.password} onChange={this.setearPassword} feedback={false} data-testid="password" />
                            <label htmlFor="password">Contraseña</label>
                        </span>
                    </div>
                    <div className="p-p-4">
                        <Button className="p-button-lg p-component p-d-block p-mx-auto" label="Ingresar" onClick={this.loguearUsuario} data-testid="botonIngresar" />
                    </div>
                </Card>
                <Toast ref={this.toast} />
            </div>
        );
    }
}

export default Login
