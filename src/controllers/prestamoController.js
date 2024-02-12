import { manejoMensajes } from '../util/manejoMensajes.handle.js';
import {
  eliminarPrestamoServicio,
  actualizarPrestamoServicio,
  obtenerTPrestamoServicio,
  obtenerTPrestamoIdServicio,
  crearPrestamoServicio,
} from '../services/prestamoService.js';

export const eliminarPrestamo = async (req, res) => {
  try {
    const prestamoEliminado = await eliminarPrestamoServicio(req.params.id);
    return res.status(200).send(prestamoEliminado);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const actualizarPrestamo = async (req, res) => {
  try {
    const prestamoActualizado = await actualizarPrestamoServicio(req.params.id, req.body.estado);
    return res.status(200).send(prestamoActualizado);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const obtenerTPrestamo = async (req, res) => {
  try {
    const prestamos = await obtenerTPrestamoServicio();
    return res.status(200).send(prestamos);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const obtenerTPrestamoId = async (req, res) => {
  try {
    const prestamo = await obtenerTPrestamoIdServicio(req.params.id);
    return res.status(200).send(prestamo);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const crearPrestamo = async (req, res) => {
  try {
    const nuevoPrestamo = await crearPrestamoServicio(req.body);
    return res.status(201).send(nuevoPrestamo);
  } catch (error) {
    console.log(error);
    manejoMensajes(error, res);
  }
};
 