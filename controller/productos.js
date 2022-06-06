const { response } = require("express");
const { Producto, Categoria } = require("../models");

const productosGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query; //se puede tambien poner valores por defecto
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).limit(limite).skip(desde),
  ]);
  res.json({ total, productos });
};

const productoGetId = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id);
  res.status(200).json({
    producto
  });
};

const productoPost = async (req, res = response) => {
  //guardar el nombre en mayusculas en la db
  //de cambiar el estado se encarga el delete
  const {estado,...body} = req.body

  //crear la data para guerdar en el modelo
  const data = {
    ...body, //aca estara la categoria validada
    nombre:body.nombre.toUpperCase(),
    usuario: req.usuario.id, //el usaurio viene del validatoke
  };
  //buscar si existe la categoria

  const productoDb = await Producto.findOne({ nombre:data.nombre });
  if (productoDb) {
    return res.status(400).json({
      msg: `El producto ${productoDb.nombre} ya existe`,
    });
  }
  const producto = new Producto(data);
  await producto.save();
  res.status(201).json(producto);
};

const productoPut=async(req,res)=>{
  const { id } = req.params;
  const { estado,usuario,...data } = req.body;
  if(data.nombre){
    data.nombre= data.nombre.toUpperCase()
  }
  //console.log(rest)
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true }).populate("usuario","nombre");
  res.json( producto );
}
const productoDelete = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
  res.json(producto);
};

module.exports = {
  productoPost,
  productosGet,
  productoGetId,
  productoPut,
  productoDelete
};