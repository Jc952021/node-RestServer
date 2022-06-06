


//ver los errores con check y validation de express-valid
// en la req supongo que le llegara algo del check

const { validationResult } = require("express-validator")

const validarCampos=(req,res,next)=>{

  const errores = validationResult(req)
  if(!errores.isEmpty()){ //si errores no esta vacio-el isEmpty es de express-valid
  return res.status(400).json(errores)
  }
  next()
}

module.exports={
  validarCampos
}