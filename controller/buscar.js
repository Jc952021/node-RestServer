const { Usuario, Categoria, Producto } = require("../models");

const { ObjectId } = require("mongoose").Types;

//se refiere a los modelos creados
const colecciones = ["usuarios", "categorias", "productos", "roles"];

//funcion para buscar el usuario
const buscarUsuarios = async (termino = "", res) => {
  //ver si el termino es un mongoId o un nombre. con mongoose
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    //si lo es entonces buscar en el modelo de usuario por el id
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [], //si usuario existe entonces enviamos el usuario deentro de un arreglo
    });
  }

  //si no es un mongoId,entonces envio un nombre o
  const regex = new RegExp(termino, "i"); //que sea insensitivo,es decir que el termino acepte o sea en minusculas o mayusculas
  const usuarios = await Usuario.find({  //el find te devuelve en un arreglo,con lo que buscas exactamente,pero si le pasas un regex,este busca
    //una coincidencia en todo el texto,es decir,buscas 1 , y te trae los usuarios que tengan 1 , 123, o prac1@gmail.com
    $or: [{ nombre: regex }, { correo: regex }], //el or sign o ,es decir que buscque con unos de estos dos obj que le pasemos
    $and: [{ estado: true }], // sign y, osea uno de los or que tenga este obj adicional
  });
  
  res.json({
    results: usuarios,
  });
};

//funcion para buscar las categorias
const buscarCategorias = async (termino = "", res) => {
  //ver si el termino es un mongoId o un nombre. con mongoose
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //si no es un mongoId,entonces envio un nombre o
  const regex = new RegExp(termino, "i"); //que sea insensitivo,es decir que el termino acepte o sea en minusculas o mayusculas
  const categorias = await Categoria.find({  //el find te devuelve en un arreglo,con lo que buscas exactamente,pero si le pasas un regex,este busca
    nombre:regex
  });

  res.json({
    results: categorias
  });
};
//funcion para buscar las productos
const buscarProductos = async (termino = "", res) => {
  //ver si el termino es un mongoId o un nombre. con mongoose
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const producto = await Producto.findById(termino);
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  //si no es un mongoId,entonces envio un nombre o
  const regex = new RegExp(termino, "i"); //que sea insensitivo,es decir que el termino acepte o sea en minusculas o mayusculas
  const productos = await Producto.find({  //el find te devuelve en un arreglo,con lo que buscas exactamente,pero si le pasas un regex,este busca
    nombre:regex
  });

  res.json({
    results: productos
  });
};



//////////////////////////////////////////
const buscarGet = (req, res) => {
  const { coleccion, termino } = req.params;
  //ver si la coleccion esta incluida en mis colecciones disponibles
  if (!colecciones.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${colecciones}`,
    });
  }
  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({ msg: "error" });
      break;
  }
};

module.exports = {
  buscarGet,
};
