import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { __dirname } from "../util/urlHandle.js";
import { manejoMensajes } from "../util/manejoMensajes.handle.js";
import { actualizarFotoServicio, consultarFoto, obtenerFotoPerfilServicio, } from "../services/usuarioService.js";
import { renombrarAvatar } from "../util/validation.js";

const getImagen = async (req, res) => {
  const idArchivo = req.params.id;
  try {
    const archivo = join(__dirname, `../public/documents/${idArchivo}`);
    return res.sendFile(archivo);
  } catch (error) {
    manejoMensajes(error, res);
  }
};

const getAvatar = async (req, res) => {
  const idArchivo = req.params.id;
  try {
    const archivo = join(__dirname, `../public/avatar/${idArchivo}`);
    if (existsSync(archivo)) {
      res.sendFile(archivo);
    } else {
      res.status(404).send({ "error": "", "msg": "Imagen No existe" })
    }
  } catch (error) {
    manejoMensajes(error, res);
  }
};

export const getAvatarPerfil = async (req, res) => {
  const id = req.params.id;
  try {
    const foto = await obtenerFotoPerfilServicio(id);
    console.log(foto);
    const archivo = join(__dirname, `../public/avatar/${foto}`);
    if (existsSync(archivo)) {
      res.status(200).sendFile(archivo);
    } else {
      res.status(404).send({ "error": "", "msg": "Imagen No existe" })
    }
  } catch (error) {
    manejoMensajes(error, res);
  }
};

const getDescargarImagen = async (req, res) => {
  const idArchivo = req.params.id;
  try {
    const ubicacionArchivo = join(
      __dirname,
      `../public/documents/${idArchivo}`
    );
    return res.download(ubicacionArchivo, idArchivo);
  } catch (error) {
    console.log(error);
    manejoMensajes(error, res);
  }
};

const cargarImagenPerfil = async (req, res) => {
  try {
    const imagenBuffer = req.file.buffer;
    const nombreArchivo = renombrarAvatar(req.file.originalname);
    const fotoAntigua = await consultarFoto(req.params.id);
    if (fotoAntigua) {
      eliminarAvatarAlmacenServicio(fotoAntigua);
    }
    const image = await optimizarImagen(imagenBuffer, nombreArchivo);
    const respuesta = await actualizarFotoServicio(req.params.id,nombreArchivo);
    res.status(200).send({
      status: 200,
      mensaje: "Foto actualizada exitosamanete",
      foto: nombreArchivo,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getImagen,
  getDescargarImagen,
  cargarImagenPerfil,
  getAvatar
};