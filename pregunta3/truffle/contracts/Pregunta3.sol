// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Pregunta3 {
    //function promedioPuntaje -> address
    //function cambiarEstado -> address, estadoNuevo
    //require cambiarEstado -> Solo el creador puede cambiar el estado del smart contract

    struct Pregunta {
        uint256 idPregunta; // AUTOINCREMENTAL -> variable global? modifier?
        address autor;
        string texto;
        string[] opciones;
        string opcionCorrecta;
    }

    struct Respuesta {
        address usuario;
        uint256 idPregunta;
        string opcion;
        uint256 puntaje;
    }

    struct Usuario {
        address id;
        Respuesta[] respuestas;
    }

    Pregunta[] public preguntas;
    Respuesta[] public respuestas;
    Usuario [] public usuarios;

    uint256 idIncremental = 0;

    function getPreguntaById(uint256 idPregunta)
        public
        view
        returns (Pregunta memory pregunta)
    {
        for (uint256 i = 0; i < preguntas.length; i++) {
            if (preguntas[i].idPregunta == idPregunta) {
                pregunta = preguntas[i];
                //return pregunta;
            }
        }
    }

    //function responder -> address (del que responde), respuesta: idPregunta, opcion, puntaje
    function responder(Respuesta memory respuesta) public {
        Pregunta memory pregunta = getPreguntaById(respuesta.idPregunta);
        require(
            respuesta.usuario != pregunta.autor,
            "No se puede responder una pregunta propia"
        );
        respuestas.push(respuesta);
    }

    //function crearPregunta -> pregunta: address (autor), texto, opciones (array?), opcionCorrecta
    function crearPregunta(Pregunta memory pregunta) public {
        pregunta.idPregunta = getId();
        preguntas.push(pregunta);
    }

    function getId() private returns(uint) { return ++idIncremental; }

    // Un usuario debe poder obtener el promedio aproximado de los puntajes de todas las respuestas que él hizo. 
    // Esto debe al menos contar con precisión entera (no es necesario calcular con decimales).
    function promedio(Usuario memory usuario) public pure returns (uint) {
        Respuesta[] memory respuestasUsuario = usuario.respuestas;
        uint puntos = 0;

        for (uint256 i = 0; i < respuestasUsuario.length; i++) {
            Respuesta memory respuesta = respuestasUsuario[i];
            puntos += respuesta.puntaje;
        }

        return puntos / respuestasUsuario.length;
    }

    /* 
    function crearPregunta(address _autor, string _texto, string[] memory _opciones, string _opcionCorrecta) public {
        preguntas.push(Pregunta({
            autor: _autor,
            texto: _texto,
            opciones: _opciones,
            opcionCorrecta: _opcionCorrecta
        }));
    } 
    */
    // function getPreguntas()
    //     public
    //     view
    //     returns (Pregunta[] memory listaPreguntas)
    // {
    //     listaPreguntas = preguntas;
    // }
}

//semilla:ritual tip pudding smoke access tide peasant iron twelve dignity tornado run
//preguntasInstance.crearPregunta({"idPregunta": 1, "autor": "0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C", "texto": "prueba", "opciones": ["prueba1","prueba2"], "opcionCorrecta": "prueba2"})
