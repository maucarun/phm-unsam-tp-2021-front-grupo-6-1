pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract Pregunta3 {
    // ¿como se calcula el puntaje al responder?

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

    Pregunta[] public preguntas;
    Respuesta[] public respuestas;

    function getPreguntaById(uint256 idPregunta)
        public
        view
        returns (Pregunta memory pregunta)
    {
        for (uint256 i = 0; i < preguntas.length; i++) {
            if (preguntas[i].idPregunta == idPregunta) {
                return pregunta;
            }
        }
    }

    //  Se debe poder agregar una nueva pregunta indicando su autor (el
    // ingresante), el texto y las opciones.
    /* 
    //function crearPregunta -> pregunta: address (autor), texto, opciones (array?), opcionCorrecta
    function crearPregunta(address _autor, string _texto, string[] memory _opciones, string _opcionCorrecta) public {
        preguntas.push(Pregunta({
            autor: _autor,
            texto: _texto,
            opciones: _opciones,
            opcionCorrecta: _opcionCorrecta
        }));
    } 
    */

    function crearPregunta(string memory texto, string[]  memory opciones, string  memory opcionCorrecta) public {
        Pregunta memory nuevaPregunta = Pregunta(1,0xf01a8037456D9c5bcc9DBf06E88fF44d9D48017A,texto,opciones, opcionCorrecta);
        preguntas.push(nuevaPregunta);
    }

    function getPreguntas()
        public
        view
        returns (Pregunta[] memory listaPreguntas)
    {
        listaPreguntas = preguntas;
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
}
