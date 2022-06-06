const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controller/usuarios");
const { roleValidator, correoValidator, validarIdMongo } = require("../helpers/db-validators");

const { validarCampos,validarJwt,tieneRole } = require("../middlewares")



const router = require("express").Router();

//se pone solo "/" para que herede de la primera ruta del use
//es decir /api/usuarios,si el usuario hace una peticion si o si debe ser la ruta anterior al router
//con es un / solo sera la ruta heredada pero se puede aumentar la ruta aqui.ejm:como en el put se agrega /:id
//ahora si ahces un put, la ruta seria /api/usuarios/:id
//al traer las funciones recordar que no se deben ejecutar
//eso se encarga el express al hacer una peticion

router.get("/", usuariosGet);

router.post("/",[
  check("correo","El correo no es valido").isEmail(),
  check("nombre","El nombre es obligatorio").not().isEmpty(),//no debe estar vacio
  check("correo").custom(correoValidator),
  check("password","El password debe tener mas de 6 letras").isLength({min:6}),
  //check("rol","No es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]), //isIn=estar en
  check("rol").custom(roleValidator),
  validarCampos
], usuariosPost);

router.put("/:id",[
  check("id","El id no es valido").isMongoId(),
  check("id").custom(validarIdMongo),
  check("rol").custom(roleValidator),
  validarCampos
], usuariosPut);

router.delete("/:id",[
  validarJwt,
  //esAdminRole,
  tieneRole("ADMIN_ROLE","USER_ROLE","NOSE_ROLE"),
  check("id","El id no es valido").isMongoId(),
  check("id").custom(validarIdMongo),
  validarCampos
], usuariosDelete);

module.exports = router;
