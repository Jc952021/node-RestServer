const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controller/usuarios");

const router = require("express").Router();

//se pone solo "/" para que herede de la primera ruta del use
//es decir /api/usuarios,si el useuario hace una peticion si o si debe ser la ruta anterior al router
//con es un / solo sera la ruta heredada pero se puede aumentar la ruta aqui.ejm:como en el put se agrega /:id
//ahora si ahces un put, la ruta seria /api/usuarios/:id
//al traer las funciones recordar que no se deben ejecutar
//eso se encarga el express al hacer una peticion

router.get("/", usuariosGet);

router.post("/", usuariosPost);

router.put("/:id", usuariosPut);

router.delete("/", usuariosDelete);

module.exports = router;
