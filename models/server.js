const express = require("express");
const cors = require("cors")


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios"

    //MIDDLEWARES
    this.middlewares();

    //RUTAS DE MI APLICACION
    this.routes();
  }

  routes() {
    //el use recibe todas las solicitudes
    //de 2 param le mandamos la ruta
   this.app.use(this.usuariosPath,require("../routes/usuarios"))
  }
  
  middlewares() {
    //CORS
    this.app.use(cors())
    //EXPRES JSON
    this.app.use(express.json())
    //DIRECTORIO PUBLICO
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Puerto listo http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
