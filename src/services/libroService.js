import { libroModel } from "../models/libroModel.js";

export const obtenerLibroIdServicio = async (libroId) => {
  return await libroModel.findById(libroId);
};

export const obtenerLibrosServicio = async () => {
  return await libroModel.find();
};

export const crearLibroServicio = async (libroData) => {
  const nuevoLibro = new libroModel(libroData);
  return await nuevoLibro.save();
};

export const borrarLibro = async (libroId) => {
  return await libroModel.findByIdAndDelete(libroId);
};