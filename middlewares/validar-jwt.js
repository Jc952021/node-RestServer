const jwt = require("jsonwebtoken");
const { response } = require("express");
const Usuario = require("../models/usuario");

const validarJwt = async (req, res = response, next) => {
  const token = req.header("token-x");
  if (!token) {
    return res.status(401).json({
      msg: "no hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PASSWORD_TOKEN);
    //leer el usuario
    console.log(uid)
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "El token no es valido usuario-no existe en la db",
      });
    }
    //verificar que el usuario tenga el estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "El token no es valido usuario con estado-false",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "token no valido",
    });
  }
};

module.exports = { validarJwt };
