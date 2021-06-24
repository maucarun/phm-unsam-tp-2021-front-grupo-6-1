// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Pregunta3 {
    address public duenio = 0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C;
    Estado public estado = Estado.ACTIVO;
    uint256 idIncremental = 0;

    mapping(uint256 => Pregunta) public preguntas;

    mapping(address => Respuesta[]) public respuestas;

    enum Estado {
        ACTIVO,
        LECTURA,
        RESPONDER,
        BOOTSTRAP
    }

    struct Pregunta {
        address autor;
        string texto;
        string[] opciones;
        string opcionCorrecta;
    }

    struct Respuesta {
        uint256 idPregunta;
        string opcion;
        uint256 puntaje;
    }

    /* 
    ACTIVO toda la funcionalidad habilitada.
    LECTURA sólo se pueden consultar preguntas existentes.
    RESPONDER sólo se permite consultar y responder preguntas, pero no crear nuevas.
    BOOTSTRAP sólo se permite crear nuevas preguntas. 
    */

    modifier verificarEstado(Estado _estado) {
        require(estado != _estado, "Estado invalido");
        _;
    }

    function cambiarEstado(Estado _estado) public { 
        require(msg.sender == duenio, "Solo se puede cambiar estado si sos el duenio del contrato");
        estado = _estado;
    }

    function getPreguntaById(uint256 idPregunta) public view verificarEstado(Estado.BOOTSTRAP) returns (Pregunta memory pregunta) {
        //for (uint256 i = 0; i < preguntas.length; i++) {
            //if (preguntas[i].idPregunta == idPregunta) {
               // pregunta = preguntas[i];
           // }
       // }
       pregunta = preguntas[idPregunta];
    }

    function responder(Respuesta memory respuesta) public verificarEstado(Estado.BOOTSTRAP) verificarEstado(Estado.LECTURA) {
        Pregunta memory pregunta = getPreguntaById(respuesta.idPregunta);
        require(
            msg.sender != pregunta.autor,
            "No se puede responder una pregunta propia"
        );
        respuestas[msg.sender].push(respuesta);
    }

    function crearPregunta(Pregunta memory pregunta) public verificarEstado(Estado.LECTURA) verificarEstado(Estado.RESPONDER) {
        preguntas[getId()] = pregunta;
    }

    function getId() private returns (uint256) {
        return ++idIncremental;
    }

    function getRespuestasByAddress(address idUsuario) public view returns (Respuesta[] memory listaRespuestas){
        listaRespuestas = respuestas[idUsuario];
    }

    function promedio() public view returns (uint256){
        Respuesta[] memory respuestasUsuario = respuestas[msg.sender];
        uint256 puntos = 0;
        uint256 cantidadRespuestas = respuestasUsuario.length;

        for (uint256 i = 0; i < cantidadRespuestas; i++) {
            Respuesta memory respuesta = respuestasUsuario[i];
            puntos += respuesta.puntaje;
        }

        return (puntos / cantidadRespuestas);
    } 
    
}
