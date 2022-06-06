const { check } = require("express-validator");
const { productoGetId, productosGet, productoPost, productoPut, productoDelete } = require("../controller/productos");

const { validarIdCategoria, validarIdProducto } = require("../helpers/db-validators");
const { validarCampos,validarJwt, esAdminRole } = require("../middlewares");


const router = require("express").Router();

//obtener los productps-paginado
router.get("/",productosGet)

//obtener las categorias por id
router.get("/:id",[
  check("id","La id no es valida").isMongoId(),
  check("id").custom(validarIdProducto),
  validarCampos
],productoGetId)

//crear categoria - debe tener el token
router.post("/",[
  validarJwt,//aca se alida el usuario
  check("nombre","El nombre es requerido").not().isEmpty(),
  check("categoria","No es un id de Mongo").isMongoId(),//ya que categoria es requerido,entonces validar el id que enviamos
  check("categoria").custom(validarIdCategoria),
  validarCampos
],productoPost
)

//crear producto-debe tener el token
router.put("/:id",[
  validarJwt,
  //check("categoria","La id no es valida").isMongoId(),
  check("id").custom(validarIdProducto),
  validarCampos
],productoPut
)

//crear producto-debe tener el token y ser admin-role
router.delete("/:id",[
  validarJwt,
  esAdminRole,
  check("id","La id no es valida").isMongoId(),
  check("id").custom(validarIdProducto),
validarCampos
],productoDelete
)


module.exports = router

