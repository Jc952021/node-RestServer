const { Categoria, Usuario, Role, Producto } = require("../models");

const roleValidator = async (rol) => {
  //de param debe ser rol,lo que esta en la prop ya que si cambio de param a otro
  //estaria enviando abajo {algo:rol} y estaria mal. si de param es rol y coincide con lo que busco
  //entonces seria {rol:rol}
  const rolEncontrado = await Role.findOne({ rol });
  if (!rolEncontrado) {
    throw new Error(`El rol ${rol} no esta registrado en la db`);
  }
};

const correoValidator = async (correo) => {
  const correoExistente = await Usuario.findOne({ correo });
  if (correoExistente) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const validarIdMongo = async (id) => {
  const idExistente = await Usuario.findById(id);
  if (!idExistente) {
    throw new Error(`El id ${id} no existe`);
  }
};
//validar id ,para ver si existe esa categoria
const validarIdCategoria = async (id) => {
  const idExistente = await Categoria.findById(id);
  if (!idExistente) {
    throw new Error(`El id ${id}-categoria no existe`);
  }
};

//validar id ,para ver si existe esa categoria
const validarIdProducto = async (id) => {
  const idExistente = await Producto.findById(id);
  if (!idExistente) {
    throw new Error(`El id ${id}-producto no existe`);
  }
};

//validar coleecion en subirarchivos
const validarColeccion = (coleccion = "", colecciones = []) => {
  if (!colecciones.includes(coleccion)) {
    throw new Error(`La coleccion enviada no es valida , ${colecciones}`);
  }
  return true
};

module.exports = {
  roleValidator,
  correoValidator,
  validarIdMongo,
  validarIdCategoria,
  validarIdProducto,
  validarColeccion,
};
