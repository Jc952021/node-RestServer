const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("166907777032-4ku1dqdoi3vnvb748lu28mahfli0d308.apps.googleusercontent.com");
const verifyGoogle = async (idToken) =>{
  const ticket = await client.verifyIdToken({
      idToken,
      audience: "166907777032-4ku1dqdoi3vnvb748lu28mahfli0d308.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  //solo necesito estos 3
  const {name:nombre,email:correo,picture:img} = ticket.getPayload();
  return {
    nombre,
    correo,
    img
  }
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
module.exports = verifyGoogle