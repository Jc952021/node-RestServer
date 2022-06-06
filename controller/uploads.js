const { response } = require("express");
const { subirArchivo } = require("../helpers");
const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2
cloudinary.config(process.env.CLOUDINARY_URL)

const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const cargarArchivo = async (req, res = response) => {
 
  try {
    const nombre = await subirArchivo(req.files, undefined, "imagenes");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res) => {
const {id,coleccion} = req.params

let modelo
switch (coleccion) {
  case "usuarios":
    modelo = await Usuario.findById(id)
    if(!modelo){
      return res.status(400).json({
        msg:`El usuario no existe con el id ${id}`
      })
    }
    break;
  case "productos":
    modelo = await Producto.findById(id)
    if(!modelo){
      return res.status(400).json({
        msg:`El producto no existe con el id ${id}`
      })
    }
    break;

  default:
    break;
}
//limpiar imagenes previas
if(modelo.img){
//acceder a la ruta anterioe donde esta la imagen
  const rutaImagenModelo = path.join(__dirname, "../uploads/", coleccion, modelo.img);
//si existe la ruta
  if(fs.existsSync(rutaImagenModelo)){
    fs.unlinkSync(rutaImagenModelo)//entonces se elimina la imagen
  }
}
//el subirarchivo te devuelve el nombre de la imagen subida
//de 3 param es el nombre de la carpeta que va a guardar la img
  const nombre = await subirArchivo(req.files, undefined, coleccion);
//se puede guardar asi tambien, en vez del finbyidupadate 
  modelo.img = nombre
  await modelo.save()
  res.json(modelo);
};

const actualizarImagenCloudinary = async (req, res) => {
const {id,coleccion} = req.params

let modelo
switch (coleccion) {
  case "usuarios":
    modelo = await Usuario.findById(id)
    if(!modelo){
      return res.status(400).json({
        msg:`El usuario no existe con el id ${id}`
      })
    }
    break;
  case "productos":
    modelo = await Producto.findById(id)
    if(!modelo){
      return res.status(400).json({
        msg:`El producto no existe con el id ${id}`
      })
    }
    break;

  default:
    break;
}
//limpiar imagenes previas
if(modelo.img){
//del nombre img solo se necesita el id de la url que esta al final sin el .algo
//ejm:https://res.cloudinary.com/duiaqc7w3/image/lbvdtv9mo297fkrke9om.gif
const nombreArr = modelo.img.split("/")
const nombre = nombreArr[nombreArr.length - 1]
//separar por el punto . y necesito el de la 1 posicion
//recordar que al ser un arreglo y destructurar, se puede poner cualquier nombre
const [public_id] = nombre.split(".")
//con esto se elimina la img
cloudinary.uploader.destroy(public_id)

}
//del req.archivo que le enviamos, extraer la archivotemporalruta
const {tempFilePath} = req.files.archivo
//usar el cloudninary, la cual nos devuelve una url donde se vera nuestra imagen
const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
  modelo.img = secure_url
  await modelo.save()
  res.json(modelo);
};



const mostrarImagen = async (req, res) => {
const {id,coleccion} = req.params

let modelo
switch (coleccion) {
  case "usuarios":
    modelo = await Usuario.findById(id)
    if(!modelo){
      return res.status(400).json({
        msg:`El usuario no existe con el id ${id}`
      })
    }
    break;
  case "productos":
    modelo = await Producto.findById(id)
    if(!modelo){
      return res.status(400).json({
        msg:`El producto no existe con el id ${id}`
      })
    }
    break;

  default:
    break;
}
//ver si existe la img
if(modelo.img){
//acceder a la ruta anterioe donde esta la imagen
  const rutaImagenModelo = path.join(__dirname, "../uploads/", coleccion, modelo.img);
//si existe la ruta
  if(fs.existsSync(rutaImagenModelo)){
    return res.sendFile(rutaImagenModelo)
  }
}
//acceder a la ruta edl asseets
const rutaImagenDefault = path.join(__dirname, "../assets/13.1 no-image.jpg");
  res.sendFile(rutaImagenDefault);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  actualizarImagenCloudinary,
  mostrarImagen
};
