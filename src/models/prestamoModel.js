
import mongoose from "mongoose";

const PrestamoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
  fechaprestamo: { type: Date, default: Date.now },
  fechalimite: { type: Date },
  fechaentrega: { type: Date },
});

const PrestamoModel = mongoose.model('Prestamo', PrestamoSchema);

export default PrestamoModel;
