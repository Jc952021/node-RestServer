const { response } = require("express");
const { Categoria } = require("../models");

const categoriasGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query; //se puede tambien poner valores por defecto
  const query = { estado: true };
  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).limit(limite).skip(desde).populate("usuario","nombre"),
  ]);
  res.json({ total, categorias });
};

const categoriaGetId = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario","nombre");
  res.status(200).json({
    categoria
  });
};

const categoriasPost = async (req, res = response) => {
  //guardar el nombre en mayusculas en la db
  const nombre = req.body.nombre.toUpperCase();

  //crear la data para guerdar en el modelo
  const data = {
    nombre,
    usuario: req.usuario.id, //el usaurio viene del validatoke
  };
  //buscar si existe la categoria

  const categoriaDb = await Categoria.findOne({ nombre });
  if (categoriaDb) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDb.nombre} ya existe`,
    });
  }
  const categoria = new Categoria(data);
  await categoria.save();
  res.status(201).json(categoria);
};

const categoriasPut=async(req,res)=>{
  const { id } = req.params;
  const { estado,usuario,...data } = req.body;
  data.nombre= data.nombre.toUpperCase()
  //console.log(rest)
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate("usuario","nombre");
  res.json( categoria );
}
const categoriasDelete = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
  res.json(categoria);
};

module.exports = {
  categoriasPost,
  categoriasGet,
  categoriaGetId,
  categoriasPut,
  categoriasDelete
};
