import mongoose  from "mongoose";
const LibroSchema = new mongoose.Schema({
    titulo: {
      type: String,
      required: true,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Autor", 
      required: true,
    },
    estado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estado", 
      required: true,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria", 
      required: true,
    },
    
  });

  const libroModel = mongoose.model("libros", LibroSchema);
  export { libroModel };