const Pregunta3 = artifacts.require('./Pregunta3.sol')
const assert = require('assert')

let pregunta3SmartContract

contract('Smart contract en estado ACTIVO y con su respectivo duenio', async () => {
    const pregunta = { "autor": "0x695825d99f71256bfb7ae199F894C15Ca399dD4E", "texto": "prueba", "opciones": ["prueba1", "prueba2"], "opcionCorrecta": "prueba2" }
    const preguntaDuenio = { "autor": "0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C", "texto": "prueba", "opciones": ["prueba1", "prueba2"], "opcionCorrecta": "prueba2" }
    const respuesta = { "idPregunta": 1, "opcion": "opcionDePrueba", "puntaje": 15 }

    beforeEach('inicializado', async () => {
        pregunta3SmartContract = await Pregunta3.new()
    })
    it('se valida el duenio y el estado por default del contrato', async () => {
        const estado = await pregunta3SmartContract.estado()
        const duenio = 0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C
        const duenioContract = await pregunta3SmartContract.duenio()
        assert.equal(estado, 0)
        assert.equal(duenioContract, duenio)
    })
    it('se crea una pregunta y se la consulta', async () => {
        await pregunta3SmartContract.crearPregunta(pregunta)
        const getPregunta = await pregunta3SmartContract.getPreguntaById(1)
        assert.equal(getPregunta.texto, pregunta.texto)
    })
    it('se cambia el estado del contrato', async () => {
        await pregunta3SmartContract.cambiarEstado(1)
        const estado = await pregunta3SmartContract.estado()
        assert.equal(estado, 1)
    })
    it('se responde una pregunta por un usuario que no es su autor', async () => {
        await pregunta3SmartContract.crearPregunta(pregunta)
        await pregunta3SmartContract.responder(respuesta)
        const duenioContract = await pregunta3SmartContract.duenio()
        const respuestas = await pregunta3SmartContract.getRespuestasByAddress(duenioContract)
        assert.equal(respuestas[0].idPregunta, respuesta.idPregunta)
    })
    it('se obtiene el promedio de un usuario', async () => {
        await pregunta3SmartContract.crearPregunta(pregunta)
        await pregunta3SmartContract.responder(respuesta)
        await pregunta3SmartContract.responder(respuesta)
        const promedio = await pregunta3SmartContract.promedio()
        assert.equal(promedio, 15)
    })
    it('en el estado LECTURA no deberia permitirse crear preguntas', () => {
        testRejection(async () => { await pregunta3SmartContract.cambiarEstado(1); await pregunta3SmartContract.crearPregunta(pregunta) }, 'Estado invalido')
    })
    it('no deberia permitirse responder una pregunta por su autor', () => {
        testRejection(async () => { await pregunta3SmartContract.crearPregunta(preguntaDuenio); await pregunta3SmartContract.responder(respuesta) }, 'No se puede responder una pregunta propia')
    })
    /* it('should not allow to withdraw a negative value', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, -10) }, 'Value must be positive')
    })
    it('should not allow to withdraw more money than it has', () => {
        testRejection(async () => { await walletSmartContract.withdraw(theAccount, 120) }, 'Not enough cash')
    })
    it('should allow to put money', async () => {
        await walletSmartContract.put(theAccount, 200)
        const balance = await walletSmartContract.wallet.call(theAccount)
        assert.equal(balance, 300)
    })
    it('should not allow to put $ 0', () => {
        testRejection(async () => { await walletSmartContract.put(theAccount, 0) }, 'Value must be positive')
    })
    it('should not allow to put a negative value', () => {
        testRejection(async () => { await walletSmartContract.put(theAccount, -10) }, 'Value must be positive')
    }) */
})

async function testRejection(callback, errorMessage) {
    try {
        await callback()
        assert.fail('Should have failed')
    } catch (e) {
        assert.equal(e.reason, errorMessage)
    }
}
