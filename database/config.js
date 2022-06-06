const mongoose = require('mongoose');

const dbConnection = async()=>{
try {
  await mongoose.connect("mongodb+srv://curso-node:cursomongo@cluster0.tnlbp.mongodb.net/CafeDb")
  console.log("Mongo Conectado")
} catch (error) {
  console.log(error)
  //este le manda al catch un obj error
  throw new Error("Error a la hora de iniciar la base de datos")
}
}

module.exports={
  dbConnection
}