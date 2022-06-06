const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type:String,
    required:[true,"El nombre es obligatorio"], // el 2 es si no coloca un nombre
  },
  correo:{
    type:String,
    required:[true,"El correo es obligatorio"],
    unique:true  // que sea unico es decir, no se puede repetir en otros docs
  },
  password:{
    type:String,
    required:[true,"El password es obligatorio"]
  },
  img:{
    type:String,
  },
  rol:{
    type:String,
    required:true,
    enum:["ADMIN_ROLE","USER_ROLE"] //enum da dos opciones a escoger y debe ser solo uno de esas  
  },
  estado:{
    type:Boolean,
    default:true //por defecto que este en true
  },
  google:{
    type:Boolean,
    default:false
  }
});
//configuracion del tojson del schema , el tojson lo transformaba a un obj normal para que pueda leerse
//aca lo interceptamos para que nos traiga lo que queremos del obj
//este puede ir de 2 param del schema pero lo haremos con el set
UsuarioSchema.set("toJSON",{
  transform:(document,returnedObject)=>{
    returnedObject.uid = returnedObject._id
    delete returnedObject.password //con esto borro el password que me deberia llegar
    delete returnedObject.__v
    delete returnedObject._id
  }
})
//otra forma
// UsuarioSchema.methods.toJSON=function(){
//   const {__v,password,...usuario} = this.toObject() //el object es el obj con todas las props dentro
//   return usuario //retornna todas las props,pero sin el __v y el pass
// }



//este crea la coleccion, de 1 param sera el nombre de la coleccion
//este debe empezar con mayus y ser singular,ya que mongoose le agrega una s
//y 2 param sera el esquema
module.exports = model("Usuario",UsuarioSchema)

//vid7
// schema es una coleccion- es como crear una tabla en mysql
