
const { check } = require("express-validator");
const { authLogin, googleSignin } = require("../controller/auth");
const { validarCampos } = require("../middlewares/validar-campos");


const router = require("express").Router();


router.post("/login",[
check("correo","Poner un correo valido").isEmail(),
check("password","La contraseña es obligatoria").not().isEmpty(),
validarCampos
],authLogin)


router.post("/google",googleSignin)


module.exports=router