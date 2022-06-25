const { response } = require("express");
const { compare } = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWt } = require("../helpers/generar-jwt");
const verifyGoogle = require("../helpers/verify-google");

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

const googleSignin = async (req, res) => {
  const { id_token } = req.body;
  try {
    const { correo, img, nombre } = await verifyGoogle(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }
    //creacion del token
    const token = await generarJWt(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no valido",
    });
  }
};

module.exports = {
  authLogin,
  googleSignin,
};
