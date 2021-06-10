Pregunta: descripcion, tipo, fechaDeCaducidad

Usuario: nombre
AMIGOS -> relacion entre Usuarios
AUTOR -> relacion entre Usuario y Pregunta
RESPONDIO -> relacion entre Usuario y Pregunta: puntos

CREATE (simple1:Pregunta {descripcion: '¿Cuantas provincias tiene Argentina?', tipo: 'simple', fechaDeCaducidad: '2021-05-05'})
CREATE (simple2:Pregunta {descripcion: 'Hamlet es una obra de...', tipo: 'simple', fechaDeCaducidad: '2021-03-17'})
CREATE (riesgo1:Pregunta {descripcion: 'Mas vale pajaro en mano que...', tipo: 'riesgo', fechaDeCaducidad: '2021-07-09'})
CREATE (riesgo2:Pregunta {descripcion: '¿Que es mas lento que piropo de tartamudo?', tipo: 'riesgo', fechaDeCaducidad: '2021-06-03'})
CREATE (solidaria1:Pregunta {descripcion: 'Cocodrilo que durmio es...', tipo: 'solidaria', fechaDeCaducidad: '2021-08-15'})
CREATE (solidaria2:Pregunta {descripcion: '¿Que es un coballo?', tipo: 'solidaria', fechaDeCaducidad: '2021-07-11'})
CREATE (solidaria3:Pregunta {descripcion: '¿De que color es el cielo?', tipo: 'solidaria', fechaDeCaducidad: '2021-12-05'})

CREATE (pepe:Usuario {nombre: 'Pepe Palala'})
CREATE (manolo:Usuario {nombre: 'Manolo Palala'})
CREATE (pancho:Usuario {nombre: 'Pancho Rancho'})
CREATE (casandra:Usuario {nombre: 'Casandra Malandra'})
CREATE (facu:Usuario {nombre: 'Facundo Sacchi'})
CREATE (elena:Usuario {nombre: 'Elena Melena'})
CREATE (harry:Usuario {nombre: 'Harry Potter'})
CREATE (pato:Usuario {nombre: 'Pato Donald'})
CREATE (mickey:Usuario {nombre: 'Mickey Mouse'})
CREATE (duffy:Usuario {nombre: 'Duffy Duf'})

CREATE 
  (pepe)-[:RESPONDIO {puntos: 10}]->(simple1),
  (casandra)-[:RESPONDIO {puntos: 10}]->(simple1),
  (casandra)-[:RESPONDIO {puntos: 10}]->(simple2),
  (casandra)-[:RESPONDIO {puntos: 70}]->(solidaria2),
  (manolo)-[:RESPONDIO {puntos: 10}]->(simple1),
  (manolo)-[:RESPONDIO {puntos: 100}]->(riesgo1),
  (manolo)-[:RESPONDIO {puntos: 50}]->(solidaria1),
  (pancho)-[:RESPONDIO {puntos: 10}]->(simple1),
  (pancho)-[:RESPONDIO {puntos: 100}]->(riesgo2),
  (pancho)-[:RESPONDIO {puntos: 65}]->(solidaria3)
CREATE
  (pancho)-[:AUTOR]->(simple2),
  (pepe)-[:AUTOR]->(riesgo1),
  (pancho)-[:AUTOR]->(simple1),
  (casandra)-[:AUTOR]->(riesgo2),
  (pancho)-[:AUTOR]->(solidaria1),
  (pepe)-[:AUTOR]->(solidaria2)
CREATE
  (pepe)-[:AMIGO]->(manolo),
  (pepe)-[:AMIGO]->(pancho),
  (manolo)-[:AMIGO]->(pancho),
  (manolo)-[:AMIGO]->(casandra),
  (pancho)-[:AMIGO]->(pepe),
  (casandra)-[:AMIGO]->(pancho),
  (facu)-[:AMIGO]->(manolo),
  (elena)-[:AMIGO]->(facu),
  (elena)-[:AMIGO]->(casandra),
  (harry)-[:AMIGO]->(elena),
  (pato)-[:AMIGO]->(mickey),
  (mickey)-[:AMIGO]->(pato),
  (duffy)-[:AMIGO]->(pato),
  (duffy)-[:AMIGO]->(mickey),
  (duffy)-[:AMIGO]->(pepe),
  (duffy)-[:AMIGO]->(casandra),
  (manolo)-[:AMIGO]->(duffy),
  (duffy)-[:AMIGO]->(facu),
  (pato)-[:AMIGO]->(facu),
  (harry)-[:AMIGO]->(facu),
  (facu)-[:AMIGO]->(duffy)

// Borrar todo el grafo
MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n, r

// query 1a
match (user:Usuario {nombre: 'Facundo Sacchi'})-[:AMIGO]->(ami:Usuario)-[:AMIGO]->(otro:Usuario) 
where not (otro)-[:AMIGO]->(user)
and not (otro)-[:AUTOR]->()
return otro;

// query 1b
match(pregunta:Pregunta) 
match(usuario:Usuario {nombre: 'Pancho Rancho'}) 
where not (usuario)-[:RESPONDIO]->(pregunta) 
and pregunta.fechaDeCaducidad > '2021-06-02' 
return pregunta, usuario;

// query 2a
match (pregunta:Pregunta {tipo:'solidaria'})
match (user:Usuario {nombre: 'Manolo Palala'})-[:AMIGO]->(amigo:Usuario)
where not (user)-[:RESPONDIO]->(pregunta) and (amigo)-[:RESPONDIO]->(pregunta) return pregunta;

// query 2b
match (user:Usuario)-[:AUTOR]->(pregunta:Pregunta),
(us:Usuario)-[resp:RESPONDIO]->(pregunta)
where resp.puntos > 50  
return user;

// Integrante 3

// Saber quienes respondieron las mismas preguntas que yo.

match (yo:Usuario {nombre:"Pepe Palala"})-[:RESPONDIO]->(preguntasPepe:Pregunta) 
match(usuario:Usuario)-[:RESPONDIO]-(preguntas:Pregunta)
where yo <> usuario and preguntasPepe = preguntas
return usuario

// Saber a qué tipo de preguntas respondió un usuario.

match (usuario:Usuario{nombre:"Casandra Malandra"})-[:RESPONDIO]->(pregunta:Pregunta) 
return pregunta.tipo, COUNT(pregunta.tipo) as cantidad

// MATCH (usuario:Usuario{nombre:"Juan"})-[:AMIGO*2..4]->(posibleAmigos)
