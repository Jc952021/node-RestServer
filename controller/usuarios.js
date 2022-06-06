const { response } = require("express");
const { request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

//al usar las  funciones y dentro el res. este no reconoce ya que no estamos en express
//para eso se trae el respnse y se iguala al res
const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query; //se puede tambien poner valores por defecto
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(limite).skip(desde),
  ]);
  res.json({ total, usuarios });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol }); //se añade el body a la colec Usuario
  //Verificar si el correo existe
  //   const correoExistente = await Usuario.findOne({correo})

  //   if(correoExistente){
  // return res.status(400).json({msg:"El correo ya existe"})
  // }
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); //por defecto es 10,si es mayor,mejor es la encriptacion
  usuario.password = bcryptjs.hashSync(password, salt); //hashear el password

  //Guardar en db
  await usuario.save(); // y se guarda con save
  res.json({
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, ...rest } = req.body;
  //console.log(rest)
  const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });
  res.json({ usuario });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
