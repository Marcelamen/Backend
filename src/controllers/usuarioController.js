import { manejoMensajes } from '../util/manejoMensajes.handle.js';
import {
  getUsuariosServicio,
  crearUsuarioServicio,
  cambioContrasenaServicio,
  
} from '../services/usuarioService.js';

export const getUsuarios = async (req, res) => {
  try {
    const resp = await getUsuariosServicio();
    return res.status(200).send(resp);
  } catch (error) {
    manejoMensajes(error, res);
  }
};


export const crearUsuario = async (req, res) => {
  try {
    const responseUsuario = await crearUsuarioServicio(req.body);
    if (responseUsuario == "400") return res.status(400).send({error:400, mensaje: "Este correo ya se encuentra registrado"})
    return res.status(200).send(responseUsuario);
  } catch (error) {
    console.log(error);
    manejoMensajes(error, res);
  }
};

export const cambioContrasena = async (req, res) => {
  try {
    const camContra = await cambioContrasenaServicio(req.body);
    return res.status(200).send(camContra);
  } catch (e) {
    console.log(e);
    manejoMensajes(error, res);
  }
};
