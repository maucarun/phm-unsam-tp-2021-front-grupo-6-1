// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Pregunta3 {
    address duenio = 0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C;
    uint256 idIncremental = 0;
    Estado public estado = Estado.ACTIVO;

    Pregunta[] public preguntas;

    mapping(address => Respuesta[]) public usuario;

    enum Estado {
        ACTIVO,
        LECTURA,
        RESPONDER,
        BOOTSTRAP
    }

    struct Pregunta {
        uint256 idPregunta;
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
     
    modifier verificarEstado(Estado memory _estado) {
        require(estado == _estado);
        _;
    } 
    modifier alResponder() {
        require(estado != Estado.BOOTSTRAP && estado != Estado.LECTURA);
        _;
    }

    modifier consultarPreguntas() {
        require(estado != Estado.BOOTSTRAP);
        _;
    }

    modifier consultarRespuestas() {
        require(estado != Estado.BOOTSTRAP && estado != Estado.RESPONDER);
        _;
    }

    modifier generarPregunta() {
        require(estado != Estado.LECTURA && estado != Estado.RESPONDER);
        _;
    } 
    */

    function verificarEstado(Estado _estado) public view {
        require(estado != _estado, "Estado invalido");
    }

    //function cambiarEstado -> address, estadoNuevo
    //require cambiarEstado -> Solo el creador puede cambiar el estado del smart contract
    function cambiarEstado(Estado _estado) public { 
        require(msg.sender == duenio);
        estado = _estado;
    }

    function getPreguntaById(uint256 idPregunta) public view returns (Pregunta memory pregunta) {
        verificarEstado(Estado.BOOTSTRAP);
        for (uint256 i = 0; i < preguntas.length; i++) {
            if (preguntas[i].idPregunta == idPregunta) {
                pregunta = preguntas[i];
            }
        }
    }

    //function responder -> address (del que responde), respuesta: idPregunta, opcion, puntaje
    function responder(Respuesta memory respuesta) public {
        verificarEstado(Estado.BOOTSTRAP);
        verificarEstado(Estado.LECTURA);
        Pregunta memory pregunta = getPreguntaById(respuesta.idPregunta);
        require(
            msg.sender != pregunta.autor,
            "No se puede responder una pregunta propia"
        );
        usuario[msg.sender].push(respuesta);
    }

    //function crearPregunta -> pregunta: address (autor), texto, opciones (array?), opcionCorrecta
    function crearPregunta(Pregunta memory pregunta) public {
        verificarEstado(Estado.LECTURA);
        verificarEstado(Estado.RESPONDER);
        pregunta.idPregunta = getId();
        preguntas.push(pregunta);
    }

    function getId() private returns (uint256) {
        return ++idIncremental;
    }

    function getRespuestasByAddress(address idUsuario) private view returns (Respuesta[] memory respuestas){
        respuestas = usuario[idUsuario];
    }

    //function promedioPuntaje -> address
    // Un usuario debe poder obtener el promedio aproximado de los puntajes de todas las respuestas que él hizo.
    // Esto debe al menos contar con precisión entera (no es necesario calcular con decimales).
    
    function promedio(address idUsuario) public view returns (uint256) {
        Respuesta[] memory respuestasUsuario = usuario[idUsuario];
        uint256 puntos = 0;

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
    
    function getPreguntas() public view returns (Pregunta[] memory listaPreguntas) {
        listaPreguntas = preguntas;
    }
    */
}
