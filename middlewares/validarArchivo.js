

const validarArchivo = (req,res,next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "Archivo/imagen no enviado" });
  }
  next()
}

module.exports={
  validarArchivo
}