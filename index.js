const Server = require("./models/server")

require("dotenv").config()


const server = new Server()



server.listen()



//vid2
//instalar expres y dotenv

//vid3
//crear carp models-server.js crear ahi tu clase y migrar el app,express,listen,etc
//crear public para usarlo en la clase con su index
//en clase para no crear props tipo variables,diferente se pone en el contructor
//traer la clase aqui y usar su prop listen para ejecutar el app

//vid4
//agregar un post,delete,put

//vid7
//instalar npm i cors
//esto permite que tu api pueda ser llamado de cualquier pag web o protegerla para qwe solo ciertas
//pag web puedan hacer uso de esa api
//usarlo en la fucnion midleware

//vid8
//crear capr routes donde tendra archivos diferentes rutas, es decir que cada uno debe tener varios usos de app en 
//cada uno - para crear un conjunto de rutas hace falta el express.Router()
//detro de cada ruta ,se debe separa cada uso en una carp controller
//ejm : si quiero manipular solo usuarios,entonces creo en routes a usuarios donde se encargara solo de usuarios
//dentro tendra uso varias funciones con req y res,todas esas funciones separarlos en una nueva carp controller

//vid9
//express.json()es una función de middleware integrada en Express a partir de v4.16.0. 
//Analiza las solicitudes JSON entrantes y coloca los datos analizados en formato req.body.
//con eso ahora la api puede recibir en su post objetos json
//hacer una peticion post y que regrese un json del body

//vid10
//hacer uso del put y recibir parametros segun el id que me envie.esto se recibe en el req.params
//tambien se puede mandar querys es decir lo que van despues del ?, y estos se reciben en req.query
//hacer una prueba enviando un get
//ejm:https://api.mrn?language=es&access_token=pk.eyJ1Ijo

//vid11
//subirlo a github con un readme
//para descargar mas rapido se agrega un tag.   git tag -a v1.0.0 -m "Fin seccion 8". git push --tags
//ir a git hub para hacer cambios al tag