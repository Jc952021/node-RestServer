const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usuarios: "/api/usuarios",
      auth: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      buscar: "/api/buscar",
      uploads: "/api/uploads",
    };

    //CONECTAR LA BASE DE DATOS
    this.conectarDb();
    //MIDDLEWARES
    this.middlewares();
    //RUTAS DE MI APLICACION
    this.routes();
  }

  routes() {
    //el use recibe todas las solicitudes
    //de 2 param le mandamos la ruta
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //EXPRES JSON
    this.app.use(express.json());
    //DIRECTORIO PUBLICO
    this.app.use(express.static("public"));
    //fileupload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath:true
      })
    );
  }

  async conectarDb() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Puerto listo http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
