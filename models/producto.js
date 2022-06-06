const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    unique:true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  categoria:{
    type:Schema.Types.ObjectId,
    ref:"Categoria",
    required:true
  },
  precio:{
    type:Number,
    default:0
  },
  img:{type:String},
  descripcion:{type:String},
  disponible:{type:Boolean,default:true}
});

ProductoSchema.set("toJSON",{
  transform:(document,returnedObject)=>{
    delete returnedObject.__v
    delete returnedObject.estado
  }
})

module.exports = model("Producto", ProductoSchema);
