
const { buscarGet } = require("../controller/buscar");


const router = require("express").Router();

//obtener lo que mandemos en la busqueda
router.get("/:coleccion/:termino",buscarGet)

module.exports=router
