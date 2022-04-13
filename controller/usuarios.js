const {response} = require("express")
const {request} = require("express")

//al usar las  funciones y dentro el res. este no reconoce ya que no estamos en express
//para eso se trae el respnse y se iguala al res
const usuariosGet=(req=request,res=response)=>{
  const {name,algo,defecto="nuevo"} = req.query //se puede tambien poner valores por defecto
  res.json({name,algo,defecto});
}
const usuariosPost=(req,res=response)=>{
  const body = req.body
  res.json(body);
}
const usuariosPut=(req=request,res=response)=>{
  const {id} = req.params
  res.json({id});
}
const usuariosDelete=(req,res=response)=>{
  res.send("delete");
}

module.exports={
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}