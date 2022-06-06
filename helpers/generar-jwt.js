const jwt = require("jsonwebtoken");

const generarJWt = (uid) => {
  const payload = {
    uid,
  };
  return new Promise((res, rej) => {
    jwt.sign(
      payload,
      process.env.PASSWORD_TOKEN,
      {
        expiresIn: "4h",
      },
      (err, token) => {
       if(err){
         console.log(err)
         rej("No se pudo generar el token")
       }else{
         res(token)
       }
      }
    );
  });
};

module.exports={
  generarJWt
}