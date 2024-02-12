
import PrestamoModel from '../models/prestamoModel.js';

export const eliminarPrestamoServicio = async (prestamoId) => {
  return await PrestamoModel.findByIdAndDelete(prestamoId);
};

export const actualizarPrestamoServicio = async (prestamoId, nuevoEstado) => {
  return await PrestamoModel.findByIdAndUpdate(prestamoId, { estado: nuevoEstado }, { new: true });
};

export const obtenerTPrestamoServicio = async () => {
  return await PrestamoModel.find().populate('usuarioId libroId');
};

export const obtenerTPrestamoIdServicio = async (prestamoId) => {
  return await PrestamoModel.findById(prestamoId).populate('usuarioId libroId');
};

export const crearPrestamoServicio = async (prestamoData) => {
  const nuevoPrestamo = new PrestamoModel(prestamoData);
  return await nuevoPrestamo.save();
};
