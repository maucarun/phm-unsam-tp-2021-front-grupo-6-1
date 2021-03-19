import React, { Component } from "react"
import { Card } from 'primereact/card'
import "./login.css"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { usuarioService } from '../services/usuario-service'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            error: false,
            errorMessage: ''
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
            this.setState({
                error: true,
                errorMessage: e.response ? e.response.data : e.message
            })
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
                    <div className="mensaje-error">
                        {this.state.error && <span data-testid="mensajeError">{this.state.errorMessage}</span>}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Login
