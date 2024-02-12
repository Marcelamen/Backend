import { manejoMensajes } from '../util/manejoMensajes.handle.js';
import {
  obtenerLibroIdServicio,
  obtenerLibrosServicio,
  crearLibroServicio,
  borrarLibro
} from '../services/libroService.js';

export const obtenerLibroId = async (req, res) => {
  try {
    const libro = await obtenerLibroIdServicio(req.params.id);
    return res.status(200).send(libro);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const obtenerLibros = async (req, res) => {
  try {
    const libros = await obtenerLibrosServicio();
    return res.status(200).send(libros);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const crearLibro = async (req, res) => {
  try {
    const nuevoLibro = await crearLibroServicio(req.body);
    return res.status(201).send(nuevoLibro);
  } catch (error) {
    console.log(error);
    manejoMensajes(error, res);
  }
};

export const eliminarLibro = async (req, res) => {
  try {
    const libroEliminado = await borrarLibro(req.params.id);
    return res.status(200).send(libroEliminado);
  } catch (error) {
    manejoMensajes(error, res);
  }
};