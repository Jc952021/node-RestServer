const { v4: uuidv4 } = require("uuid");
const path = require("path");

const subirArchivo = (files, extensiones = ["jpg", "jpeg", "png","gif"],carpeta="") => {
  return new Promise((resolve, reject) => {
    //el archivo es el nombre con el que se subio una img/arch
    const { archivo } = files;
    //simplificar el archivo-nombre que envio el usuario
    //el split crea un arreglo y crea separaciones de acuerdo a si hay un punto en el texto
    const nombreCortado = archivo.name.split(".");
    //me interesa solo el final
    const extension = nombreCortado[nombreCortado.length - 1];
    //Validar la extension
    if (!extensiones.includes(extension)) {
      return reject(`La extension ${extension} no es valida, ${extensiones}`);
    }

    //creamos un nombretemp con el uuid mas la extension
    const nombreTemp = uuidv4() + "." + extension;
    //el dirname se referia a su padre
    //el uploads a la carpeta donde lo enviariamos el archivo, crear manualmente la carp
    //carpeta viene del apram si el usuario lo envia
    //El método path.join() une los segmentos de ruta especificados en una sola ruta
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    //el mv sign. se mueve, es decir movemos nuestro archivo que enviamos a la ruta
    //uploadPath que creamos arriba
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo
}