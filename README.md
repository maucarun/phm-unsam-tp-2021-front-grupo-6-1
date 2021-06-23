semilla:ritual tip pudding smoke access tide peasant iron twelve dignity tornado run

``` java
truffle migrate
truffle compile
truffle console

var preguntasInstance = await Pregunta3.new()

preguntasInstance.getRespuestasByAddress('0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C')

//prueba de require "No se puede responder una pregunta propia":
preguntasInstance.responder('0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C',{"idPregunta": 1,"opcion": "opcionDePrueba","puntaje":15})

preguntasInstance.responder('0x695825d99f71256bfb7ae199F894C15Ca399dD4E',{"idPregunta": 1,"opcion": "opcionDePrueba","puntaje":15})
preguntasInstance.responder({"idPregunta": 1,"opcion": "opcionDePrueba","puntaje":15})

preguntasInstance.getRespuestasByAddress('0x695825d99f71256bfb7ae199F894C15Ca399dD4E')

preguntasInstance.getPreguntaById(2)

preguntasInstance.cambiarEstado(3)

preguntasInstance.crearPregunta({"idPregunta": 1, "autor": "0x44026F6C64C2c98Ae7D4FbC15B20ae730B52AC8C", "texto": "prueba", "opciones": ["prueba1","prueba2"], "opcionCorrecta": "prueba2"})
```