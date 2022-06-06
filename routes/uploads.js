const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controller/uploads");
const router = require("express").Router();
const { validarColeccion } = require("../helpers");
const { validarCampos, validarArchivo } = require("../middlewares");


router.post("/",validarArchivo,cargarArchivo);

router.put("/:coleccion/:id",validarArchivo,[
  check("id","La id no es valida").isMongoId(),
  check("coleccion").custom((c)=>validarColeccion(c,["usuarios","productos"])),
  validarCampos
], actualizarImagenCloudinary);

router.get("/:coleccion/:id",[
  check("id","La id no es valida").isMongoId(),
  check("coleccion").custom((c)=>validarColeccion(c,["usuarios","productos"])),
  validarCampos
], mostrarImagen);

module.exports = router;
