const validaRoles = require("./validar_roles");
const validarCampos = require("./validar-campos");
const validarJwt = require("./validar-jwt");
const validarArchivo  = require("./validarArchivo");

module.exports = {
  ...validaRoles,
  ...validarCampos,
  ...validarJwt,
  ...validarArchivo
};
