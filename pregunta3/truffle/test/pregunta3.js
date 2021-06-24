const Pregunta3 = artifacts.require('./Pregunta3.sol')
const assert = require('assert')

let pregunta3SmartContract

contract('Smart contract en estado ACTIVO y con su respectivo duenio', async () => {
    const pregunta = { "autor": "0x695825d99f71256bfb7ae199F894C15Ca399dD4E", "texto": "prueba", "opciones": ["prueba1", "prueba2"], "opcionCorrecta": "prueba2" }
    const preguntaDuenio = { "autor": "0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C", "texto": "prueba", "opciones": ["prueba1", "prueba2"], "opcionCorrecta": "prueba2" }
    const respuesta = { "idPregunta": 2, "opcion": "opcionDePrueba", "puntaje": 15 }

    beforeEach('inicializado', async () => {
        pregunta3SmartContract = await Pregunta3.new()
        await pregunta3SmartContract.crearPregunta(pregunta)
    })
    it('se valida el duenio y el estado por default (ACTIVO) del contrato', async () => {
        const estado = await pregunta3SmartContract.estado()
        const duenio = 0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C
        const duenioContract = await pregunta3SmartContract.duenio()
        assert.equal(estado, 0)
        assert.equal(duenioContract, duenio)
    })
    it('se cambia el estado del contrato', async () => {
        await pregunta3SmartContract.cambiarEstado(1)
        const estado = await pregunta3SmartContract.estado()
        assert.equal(estado, 1)
    })
    it('se obtiene el promedio de un usuario', async () => {
        await pregunta3SmartContract.crearPregunta(pregunta)
        await pregunta3SmartContract.responder(respuesta)
        await pregunta3SmartContract.responder(respuesta)
        const promedio = await pregunta3SmartContract.promedio()
        assert.equal(promedio, 15)
    })
    it('en el estado ACTIVO se responde una pregunta, por un usuario que no es su autor', async () => {
        await pregunta3SmartContract.crearPregunta(pregunta)
        await pregunta3SmartContract.responder(respuesta)
        const duenioContract = await pregunta3SmartContract.duenio()
        const respuestas = await pregunta3SmartContract.getRespuestasByAddress(duenioContract)
        assert.equal(respuestas[0].idPregunta, respuesta.idPregunta)
    })
    it('no deberia permitirse responder una pregunta por su autor', () => {
        testRejection(async () => {
            await pregunta3SmartContract.crearPregunta(preguntaDuenio)
            await pregunta3SmartContract.responder(respuesta)
        }, 'No se puede responder una pregunta propia')
    })
    it('en el estado ACTIVO se crea una pregunta y se la consulta', async () => {
        await pregunta3SmartContract.crearPregunta(pregunta)
        const getPregunta = await pregunta3SmartContract.getPreguntaById(2)
        assert.equal(getPregunta.texto, pregunta.texto)
    })
    it('en el estado LECTURA se pueden consultar preguntas', async () => {
        await pregunta3SmartContract.cambiarEstado(1)
        const getPregunta = await pregunta3SmartContract.getPreguntaById(1)
        assert.equal(getPregunta.texto, pregunta.texto)
    })
    it('en el estado LECTURA no deberia permitirse crear preguntas', () => {
        testRejection(async () => {
            await pregunta3SmartContract.cambiarEstado(1)
            await pregunta3SmartContract.crearPregunta(pregunta)
        }, 'Estado invalido')
    })
    it('en el estado LECTURA no deberia permitirse responder preguntas', () => {
        testRejection(async () => {
            await pregunta3SmartContract.cambiarEstado(1)
            await pregunta3SmartContract.responder(respuesta)
        }, 'Estado invalido')
    })
    it('en el estado RESPONDER se pueden consultar preguntas', async () => {
        await pregunta3SmartContract.cambiarEstado(2)
        const getPregunta = await pregunta3SmartContract.getPreguntaById(1)
        assert.equal(getPregunta.texto, pregunta.texto)
    })
    it('en el estado RESPONDER se pueden responder preguntas', async () => {
        await pregunta3SmartContract.responder(respuesta)
        const duenioContract = await pregunta3SmartContract.duenio()
        const respuestas = await pregunta3SmartContract.getRespuestasByAddress(duenioContract)
        assert.equal(respuestas[0].idPregunta, respuesta.idPregunta)
    })
    it('en el estado RESPONDER no deberia permitirse crear preguntas', () => {
        testRejection(async () => {
            await pregunta3SmartContract.cambiarEstado(2)
            await pregunta3SmartContract.crearPregunta(pregunta)
        }, 'Estado invalido')
    })
    it('en el estado BOOTSTRAP se pueden crear preguntas, se valida su creacion cambiando a estado ACTIVO', async () => {
        await pregunta3SmartContract.cambiarEstado(3)
        await pregunta3SmartContract.crearPregunta(pregunta)
        await pregunta3SmartContract.cambiarEstado(0)
        const getPregunta = await pregunta3SmartContract.getPreguntaById(2)
        assert.equal(getPregunta.texto, pregunta.texto)
    })
    it('en el estado BOOTSTRAP no deberia permitirse responder preguntas', () => {
        testRejection(async () => {
            await pregunta3SmartContract.cambiarEstado(3)
            await pregunta3SmartContract.crearPregunta(pregunta)
            await pregunta3SmartContract.responder(respuesta)
        }, 'Estado invalido')
    })
    it('en el estado BOOTSTRAP no deberia permitirse consultar preguntas', () => {
        testRejection(async () => {
            await pregunta3SmartContract.cambiarEstado(3)
            await pregunta3SmartContract.crearPregunta(pregunta)
            const duenioContract = await pregunta3SmartContract.duenio()
            await pregunta3SmartContract.getRespuestasByAddress(duenioContract)
        }, 'Estado invalido')
    })
})

async function testRejection(callback, errorMessage) {
    try {
        await callback()
        assert.fail('Should have failed')
    } catch (e) {
        assert.equal(e.reason, errorMessage)
    }
}
