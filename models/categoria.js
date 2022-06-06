const { Schema, model } = require("mongoose");

const CategoriaSchema = new Schema({
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
});

CategoriaSchema.set("toJSON",{
  transform:(document,returnedObject)=>{
    delete returnedObject.__v
    delete returnedObject.estado
  }
})

module.exports = model("Categoria", CategoriaSchema);
