Pregunta: descripcion, tipo, fechaDeCaducidad

Usuario: nombre
AMIGOS -> relacion entre Usuarios
AUTOR -> relacion entre Usuario y Pregunta
RESPONDIO -> relacion entre Usuario y Pregunta: puntos



CREATE (preguntaSimple1:Pregunta {descripcion: '¿Cuantas provincias tiene Argentina?', tipo: 'simple', fechaDeCaducidad: '2021-05-05'})

CREATE (usuario1:Usuario {nombre: 'Pepe Palala'})

CREATE 
  (usuario1)-[:RESPONDIO {puntos: 10}]->(preguntaSimple1),
  (usuario1)-[:AUTOR]->(preguntaSimple2),
  (usuario1)-[:AMIGOS]->(usuario2),




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