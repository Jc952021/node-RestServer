const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  //verificar que existe el usuario en el req
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere validar el rol sin validar el token primero",
    });
  }
  const { nombre, rol } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El ${nombre} no es admin`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  //console.log(roles)
  //el resto de los param, este lo recibira como un arreglo de lo que le pasemos
  return (req, res = response, next) => {
    //verificar que existe el usuario en el req
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere validar el rol sin validar el token primero",
      });
    }
    if(!roles.includes(req.usuario.rol)){
      return res.status(401).json({
        msg:`El servicio require uno de estos ${roles}`
      })
    }
    next()
  };
};

module.exports = {
  esAdminRole,
  tieneRole
};
