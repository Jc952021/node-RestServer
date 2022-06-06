const { response } = require("express");
const { compare } = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWt } = require("../helpers/generar-jwt");

const authLogin = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //ver si el correo existe
    const usuario = await Usuario.findOne({ correo });
    const validPassword = !usuario
      ? false
      : await compare(password, usuario.password);
    if (!(usuario && validPassword)) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos",
      });
    }
    //ver si el usuario con el correo tiene de estado false
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos estado-false",
      });
    }
    //creacion del token

    const token = await generarJWt(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

const googleSignin = (req, res) => {
  
  console.log(req.body);
  res.json({req,msg:"inutil"})
};

module.exports = {
  authLogin,
  googleSignin,
};
