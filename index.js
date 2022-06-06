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
// instalar npm i cors
// esto permite que tu api pueda ser llamado de cualquier pag web o protegerla para qwe solo ciertas
// pag web puedan hacer uso de esa api
//usarlo en la fucnion midleware

//vid8
// crear capr routes donde tendra archivos diferentes rutas, es decir que cada uno debe tener varios usos de app en 
// cada uno - para crear un conjunto de rutas hace falta el express.Router()
// detro de cada ruta ,se debe separa cada uso en una carp controller
// ejm : si quiero manipular solo usuarios,entonces creo en routes a usuarios donde se encargara solo de usuarios
// dentro tendra uso varias funciones con req y res,todas esas funciones separarlos en una nueva carp controller

//vid9
//express.json()es una función de middleware integrada en Express a partir de v4.16.0. 
// Analiza las solicitudes JSON entrantes y coloca los datos analizados en formato req.body.
// con eso ahora la api puede recibir en su post objetos json
// hacer una peticion post y que regrese un json del body

//vid10
//hacer uso del put y recibir parametros segun el id que me envie.esto se recibe en el req.params
//tambien se puede mandar querys es decir lo que van despues del ?, y estos se reciben en req.query
//hacer una prueba enviando un get
//ejm:https://api.mrn?language=es&access_token=pk.eyJ1Ijo

//vid11
//subirlo a github con un readme
//para descargar mas rapido se agrega un tag.   git tag -a v1.0.0 -m "Fin seccion 8". git push --tags
//ir a git hub para hacer cambios al tag


//seccion9
//vid4
//crear un user en mongo db atlas-user privilegio read and write
//guardar el user y contra en el .env

//vid5
//ir a cluster-connect-conncect mongo compass 
//copiar la url y campiar el test por el nombre de tu db

//vid6
//instalar npm i mongoose - https://mongoosejs.com/
//crear carp database - config.js - ir ahi
//ejecutarlo en el constructor

//vid 7 
//en models crear un nuevo esquema ir ahi

//vid8
//en controller traer el modelo e insertar el body que le enviaremos por post

//vid9
//encriptar el password
//destructurar las props mas importantes del body
//instalar npm i bcryptjs ir a usuarios

//vid10
//verificar que el correo que me envio sea unico y ver que tenga el @
//ver si existe el correo con findOne-que sig. que te traera la 1 coincidencia doc que encuentre
//se tiene que envia en un {algo:xd}
//instalar npm i express-validator
//se pone un check en medio de la ruta y el controlador,si son varios midlewares entonces
//se pone un arreglo.el check recibe de 1 parametro,del body,que campo verificar,de 2 un mensaje.isemail
//para ver los errores se verifica el req del controlador con validationresult


//vid11
//hacer check de los campos importantes
//como en los controladores debiamos poner el validatioresult por cada uno
//entonces se crea una carp midleware 
//next() significa que va al siguiente midleware,si no hay entonces al controlador
//todos los check son middlewares con next,luego se importa sin ()despues de los checks

//vid12
//crear una nueva coleccion de roles en mongoatlas
//crear un nuevo modelo role
//hacer validacion en el check para rol

//vid13
//crear una carp helpers-db-validators,donde estara la funcion del custom
//en el shema del usuario hacer que solo me llege la info sin el password y el __v

//vid14
//para no estar verificando el correo si existe en cada controlador
//entonces se crea un nuevo validator

//vid15
//hacer un cambio en el put,recordar que para actualizar se manda un obj con lo que quieres actualizar
//y para ver como se actualizo se agrega como 3 param un {new:true}

//vid16
//crear validacione para el put en el routes usuarios
//ver si el id es valido-el check tambien puede ver el id del params
//si eliminas el ultimo num de id y pones otro,tambien verificar ese error ya que devolvia null


//vid17
//al hcer un get debemos hacer un query y este get debe devolver un limite y un desde
//recordar que un query te trae en un string pero aca creo que te trae igual

//vid18
//en get como habia dos await tenia que esperar para que termine una y despues ejecutarse otra
//para ejecutar todas las promesas a la vez, crear un promise.all
///hacer esto cuando ves que las promesas no dependan entre si
//tambien agregar una consulta para que traiga solo los archivos con estado true

//vid19
//ahora hacer un delete,pero aca sera diferente ya qye normalmente se haria con un findidDelete
//pero en esta app con solo cambiar el estado a false, estaria bien,ya que al hacer un get
//este solo trae los estados true

//vid20
//subirlo a heroku
//si el env ya lo subiste a tu repo y deseas ponerlo de nuevo en tu gitignore
//para boorar el env se pone git rm .env --cached - luego gaurdarlo con add-com-pus
//al no tener env,heroku dara error porque no tiene el entorno
//paa eso se pone un entorno a heroku, en la terminal
//heroku config:set tuvarialedeEnt="xd" , para verlo es con heroku config y borrarlo en con heroku config:unset tuvariabledeEnt
//o creo que puedes tambien agregarle en las configuraciones de heroku

//seccion10
//vid6
//crear una nueva ruta api/login,tambien sus controladores
//en la ruta hacer unos cuantos midlewares para validar y luego seguira el controlador

//vid7
//en el controlador authlogin-hacer una verificacion si existe el correo que puso
//ver si el suuario encontrado tiene de estado false, y ver si coinciden la contraseña con el bcrypt

//vid8
//descargar npm i json-webtoke - en helpers crear una funcion asincrona de promesa
//donde guardara el id del ususario en el token,al ser asincrono su funcion del sign puede devolver el token
//y el error

//vid9
//cambiar el _id del modelo usuario a uid

//vid10
//crear un midleware donde se verificara el token que llegara desde el header
//si no es entonces enviar un error,si es entonces enviar el uid en el req
//probar el midleware en el rouerdelete

//vid11
//en el jwt cuando validemos-con el id del verify, buscar con ese id al usuario y enviarlo en el req
//tambien verificar que el usuario y si ese usuario.estado es falso, entonces enviar un error json

//vid12
//crear un midleware donde verificar que el usuario autenticado tenga de rol ADMIN_ROLE

//vid13
//como en la secuencia de midlewares queremos pasar parametros,se debe crear una funcion,que a su vez esta funcion
//retornara una funcion donde sera el midleware- esta funcion es para verificar que el rol del usuario
//tenga uno de esos roles en los param que le pasemos - crearlo en el midleare validar_roles

//vd14
//el index de una carpeta seria siendo la principal de una carpeta
//como en la ruta del usuario se sigue usando muchas veces el require de midleware
//entonces crear un index para la carp midleware donde se exportara todos los archivos dentro de la carp midleware

//vid16
//subirlo a heroku eliminado tu env y agregando al heroku con el config:set

//seccion11
//vid4
//ir a https://developers.google.com/identity/sign-in/web/sign-in
//crear un proyecto - credenciales-id de cliente auth - copiar tu id y el secreto

//vid5
//en esa misma pagina te dira como poner un script y algunas funciones, en el index.html

//seccion12
//vid4
//hacer un crud de una nueva ruta categorias,sin poner todavia sus controladores
//en models-server transformar sus paths en un obj

//vid5
//crear un nuevo modelo categoria,este tendra una prop usuario,que sera un id,referenciado del modelo Usuario
//como hay varios modelos,se crea un index y se exporta todo en un obj

//vid6
//crear los check para el categoriapost,y sus midlewares
//crear un controlador para el post categoria

//vid7
//crear los controladores para cada router-categoria,hacer los checks-usar el populate

//vid8
//el populate ,te trae el contenido de un modelo,que esta dentro de otro modelo,
//se pone despues cuando estas usando un find,y en el 1 param sera el modelo que quieres que lo traiga
//de 2 sera la prop de ese modelo que quieres que traiga, el id siempre va a venir
//en el modelo categorias,eliminar el -v y el estado

//vid10
//crear un nuevo modelo producto-hacer su crud-igual que la categoria

//vid12
//crear una ruta buscar,donde tendra dos parametros

//vid13
//en la ruta buscar,sera una ruta especial,ya que se usara un switch y se vera en un arreglo,
//si existe una coleccion

//vid14
//como verificamos si es un mongoId
//entonces nos mando un nombre o correo
//usar el regex

//vid15
//hacer lo mismo para las categorias,productos
//para buscar un producto por id categoria, creo que se pone productos.find({categoria:ObjectId("elId")})
//subirlo a heroku

//seccion13
//vid3
//crear una ruta para api/uploads

//vid4
//descargar el paquete expres-fileupload

//vid5
//validar algunos archivos que envia el usuario segun el final de l arch

//vid6
//guardar el arhivo con otro nombre usando el uuid

//vid7
//en helpers iran las funciones,crear uno para subir un archivo, donde sera una promesa que recibira
//lagunos parametros

//vid8
//en la promesa de subirArchivo cuando le añadimos una carp dara error,hay que agregar al midleware de fileupload
//una propiedad

//vid9
//crear un nuevo controlador para actualizar una coleccion segun el id que pasemos en subirArchivo

//vid10
//en el controlador actualizarArchivo-hacer un switch verificando lo que envio el user de colecion
//segun lo uqe me haya llegado agregar una img en el modelo de la coleccion

//vid11
//crear un midleare con el req,files - si el user no le envia el archivo

//vid12
//si existe una imagen ,borrar la imagen anterior

//vid13
//crear otro controllerr para que nos envie una imagen

//vid14
//si el id que envia,no tiene imagen entonces enviarle una por defecto que vendra en los aseets

//vid15
//instalar npm i cloudinary
//crearse una cuenta y copiar la pai environment y pegarlo en tu process

//vid16
//usar el cloudniary, usar el require de eso y mandarle de config nuestro proces
//crear otro controlador y sar el cloud

//vid17
//eliminar la img con destroy

//seccion14
//vid4
//crear el proyecto y ponerle css bootstrap

//vid5
//instalacion de socket, en el modelo server crear el io