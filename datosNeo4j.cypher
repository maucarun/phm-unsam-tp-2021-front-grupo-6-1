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
  (casandra)-[:RESPONDIO {puntos: 10}]->(simple2),
  (manolo)-[:RESPONDIO {puntos: 100}]->(riesgo1),
  (pancho)-[:RESPONDIO {puntos: 100}]->(riesgo2),
  (manolo)-[:RESPONDIO {puntos: 50}]->(solidaria1),
  (casandra)-[:RESPONDIO {puntos: 70}]->(solidaria2),
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
match (user:Usuario)-[:AUTOR]->(pregunta:Pregunta) 
match (us:Usuario)-[resp:RESPONDIO]->(pregunta)
where resp.puntos > 50  
return user;

// MATCH (usuario:Usuario{nombre:"Juan"})-[:AMIGO*2..4]->(posibleAmigos)










CREATE (ivanlisas:Alumne { nombre: 'Lisas Ivan', usuarioGithub: 'IvanLisas'})
CREATE (edipietro:Alumne { nombre: 'Di Pietro Estefanía', usuarioGithub: 'edipietro'})
CREATE (marianobottazzi:Alumne { nombre: 'Bottazzi Mariano', usuarioGithub: 'marianobottazzi'})
CREATE (joniim23:Alumne { nombre: 'Mansilla Jonathan', usuarioGithub: 'joniim23'})
CREATE (mgonzalezperna:Alumne { nombre: 'Gonzalez Perna Martin Alejandro', usuarioGithub: 'mgonzalezperna'})
CREATE (maxi279:Alumne { nombre: 'Maximiliano Bianco', usuarioGithub: 'MAXI279'})
CREATE (pablovig:Alumne { nombre: 'Vigliero Pablo', usuarioGithub: 'pablovig'})
CREATE (santijas:Alumne { nombre: 'Ranieri Santiago Alejandro', usuarioGithub: 'santijas'})
CREATE (loygabriel:Alumne { nombre: 'Loy Gabriel', usuarioGithub: 'LoyGabriel'})
CREATE (nicolaspucci1989:Alumne { nombre: 'Nicolas Pucci', usuarioGithub: 'nicolaspucci1989'})
CREATE (iivaanm:Alumne { nombre: 'Ivan Medina', usuarioGithub: 'iivaan-m'})
CREATE (fedes23:Alumne { nombre: 'Serafini Giraudo Dario Federico', usuarioGithub: 'Fedes23'})
CREATE (naahueeh:Alumne { nombre: 'Ramos Nahuel', usuarioGithub: 'Naahueeh'})
CREATE (saanti1535:Alumne { nombre: 'Lopez Roth Santiago ', usuarioGithub: 'Saanti1535'})
CREATE (santil99:Alumne { nombre: 'Lorenzo Santiago', usuarioGithub: 'santil99'})
CREATE (maucarun:Alumne { nombre: 'Carunchio Mauricio', usuarioGithub: 'maucarun'})
CREATE (facusacchi:Alumne { nombre: 'Facundo Sacchi', usuarioGithub: 'facusacchi'})
CREATE (nannfernandez:Alumne { nombre: 'Nancy Vargas Fernandez', usuarioGithub: 'NannFernandez'})
CREATE (siuss:Alumne { nombre: 'Salamida Diego', usuarioGithub: 'Siuss'})
CREATE (nahuelcf:Alumne { nombre: 'Flores Nahuel', usuarioGithub: 'NahuelCF'})
CREATE (gustavososa92:Alumne { nombre: 'Gustavo Sosa', usuarioGithub: 'gustavososa92'})
CREATE (tomiaraujo:Alumne { nombre: 'Araujo Tomás', usuarioGithub: 'tomiaraujo'})
CREATE (sanntibenitez:Alumne { nombre: 'Santiago Benitez', usuarioGithub: 'Sanntibenitez'})
CREATE (fakeStudent: Alumne { nombre: 'Fake Student', usuarioGithub: 'iamafake'})
CREATE 
  (siuss)-[:AMIGUE]->(facusacchi),
  (santijas)-[:AMIGUE]->(nahuelcf),
  (marianobottazzi)-[:CURSA {grupo: 1, entrega1: 'Muy Bien'}]->(phm),
  (edipietro)-[:CURSA {grupo: 1, entrega1: 'Muy Bien'}]->(phm),
  (ivanlisas)-[:CURSA {grupo: 1, entrega1: 'Muy Bien'}]->(phm),
  (maxi279)-[:CURSA {grupo: 2, entrega1: 'Muy Bien'}]->(phm),
  (mgonzalezperna)-[:CURSA {grupo: 2, entrega1: 'Muy Bien'}]->(phm),
  (joniim23)-[:CURSA {grupo: 2, entrega1: 'Muy Bien'}]->(phm),
  (loygabriel)-[:CURSA {grupo: 3, entrega1: 'Muy Bien'}]->(phm),
  (santijas)-[:CURSA {grupo: 3, entrega1: 'Muy Bien'}]->(phm),
  (pablovig)-[:CURSA {grupo: 3, entrega1: 'Muy Bien'}]->(phm),
  (iivaanm)-[:CURSA {grupo: 4, entrega1: ''}]->(phm),
  (nicolaspucci1989)-[:CURSA {grupo: 4, entrega1: ''}]->(phm),
  (fedes23)-[:CURSA {grupo: 4, entrega1: ''}]->(phm),
  (saanti1535)-[:CURSA {grupo: 5, entrega1: 'Muy Bien'}]->(phm),
  (santil99)-[:CURSA {grupo: 5, entrega1: 'Muy Bien'}]->(phm),
  (naahueeh)-[:CURSA {grupo: 5, entrega1: 'Muy Bien'}]->(phm),
  (maucarun)-[:CURSA {grupo: 6, entrega1: 'Muy Bien'}]->(phm),
  (facusacchi)-[:CURSA {grupo: 6, entrega1: 'Muy Bien'}]->(phm),
  (nannfernandez)-[:CURSA {grupo: 6, entrega1: 'Muy Bien'}]->(phm),
  (nahuelcf)-[:CURSA {grupo: 7, entrega1: ''}]->(phm),
  (siuss)-[:CURSA {grupo: 7, entrega1: ''}]->(phm),
  (gustavososa92)-[:CURSA {grupo: 7, entrega1: ''}]->(phm),
  (tomiaraujo)-[:CURSA {grupo: 8, entrega1: 'Bien +'}]->(phm),
  (sanntibenitez)-[:CURSA {grupo: 8, entrega1: 'Bien +'}]->(phm),
  (fakeStudent)-[:CURSA {abandono: true}]->(phm)

// Para crear alumnes
// Alumnos 2021
// 'CREATE (' + C3 + ':Alumne { nombre: \'' + A3 + '\', usuarioGithub: \'' +	C3 + '\'})'

// Relación cursa en la planilla de alumnes
// Planilla cursada
// =CONCATENATE("(", LOWER(D2), ")-[:CURSA {grupo: ", F2, ", entrega1: '", H2, "'}]->(phm)")

//DETACH DELETE