const { check } = require("express-validator");
const { categoriasPost, categoriasGet, categoriaGetId, categoriasPut, categoriasDelete } = require("../controller/categorias");
const { validarIdCategoria } = require("../helpers/db-validators");
const { validarCampos,validarJwt, esAdminRole } = require("../middlewares");


const router = require("express").Router();

//obtener las categorias-paginado
router.get("/",categoriasGet)

//obtener las categorias por id
router.get("/:id",[
  check("id","La id no es valida").isMongoId(),
  check("id").custom(validarIdCategoria),
  validarCampos
],categoriaGetId)

//crear categoria - debe tener el token
router.post("/",[
  validarJwt,
  check("nombre","El nombre es requerido").not().isEmpty(),
  validarCampos
],
categoriasPost
)

//crear categoria-debe tener el token
router.put("/:id",[
  validarJwt,
  check("nombre","El nombre es requerido").not().isEmpty(),
  check("id","La id no es valida").isMongoId(),
  check("id").custom(validarIdCategoria),
  validarCampos
],categoriasPut
)

//crear categoria-debe tener el token y ser admin-role
router.delete("/:id",[
  validarJwt,
  esAdminRole,
  check("id","La id no es valida").isMongoId(),
  check("id").custom(validarIdCategoria),
validarCampos
],categoriasDelete
)




module.exports = router