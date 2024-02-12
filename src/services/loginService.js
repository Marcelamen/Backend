import dotenv from "dotenv";
import { resolve } from "path";
import { __dirname } from "../util/urlHandle.js";

dotenv.config();
dotenv.config({
  path: resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`),
});
import { usuarioModel } from "../models/usuarioModel.js";
import { encriptarContrasena, verificarClave } from "../util/bcript.js";
import {
  generarTokenTemporal,
  generarToken,
  verificarToken,
} from "../util/jwt.js";
import { enviarCorreo } from "./emailServicio.js";

export const loginServicio = async (email, clave) => {
  const usuario = await usuarioModel.findOne({
    correo: email,
  });
  if (!usuario) return "204";
  const validacionClave = await verificarClave(clave, usuario.contrasenia);
  if (!validacionClave) return "204";

  const token = generarToken();
  const data = {
    id: usuario.id,
    nombre: usuario.nombres,
    apellido: usuario.apellidos,
    cargo: usuario.cargo,
    grupo: usuario.grupo,
    correo: usuario.correo,
    foto: usuario.foto,
    puntos: usuario.puntos,
    token,
  };
  return data;
};

export const olvideContraseniaServicio = async (correo, clave) => {
  const usuario = await usuarioModel.findOne({ correo });
  if (usuario == null) {
    return " 204"; // Correo no registrado o invalido.
  }
  const token = generarTokenTemporal(usuario.id, usuario.correo);
  const link = `${process.env.LINK}forgotPw/${token}/${usuario.id}`;
  const opcionesEmail = {
    from: "innovacion@grupoasd.com",
    to: usuario.correo,
    subject: "Recuperar contraseña aplicacion innovacion🦊",
    template: "email",
    context: {
      link,
    },
  };
  enviarCorreo(opcionesEmail);
};

export const cambioContrasenaServicio = async (id, token) => {
  try {
    console.log(id);
    console.log(token);
    const verificacionToken = verificarToken(token);
    if (!verificacionToken) return false;
    const usuario = await usuarioModel.findOne({ _id: id }, {});
    if (usuario == null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
export const cambioContrasenaActualServicio = async (usuario) => {
  try {
    const busquedaUsuario = await usuarioModel.findById(usuario.id);

    if (!busquedaUsuario) {
      return { status: "204", message: "Usuario no encontrado" };
    }

    if (!usuario.contraseniaActual && !usuario.contrasenia) {
      return {
        status: "400",
        message:
          "No se proporcionó la contraseña actual ni la nueva contraseña",
      };
    }

    if (usuario.contraseniaActual) {
      const validacionClave = await verificarClave(
        usuario.contraseniaActual,
        busquedaUsuario.contrasenia
      );

      if (!validacionClave) {
        return { status: "401", message: "Contraseña actual incorrecta" };
      }
    }

    const nuevaContrasenia = usuario.contrasenia || usuario.contraseniaActual;

    const claveEncriptada = await encriptarContrasena(nuevaContrasenia);

    await usuarioModel.updateOne(
      { correo: busquedaUsuario.correo },
      { contrasenia: claveEncriptada }
    );

    return { status: "200", message: "Contraseña cambiada exitosamente" };
  } catch (error) {
    return { status: "422", message: "Error al actualizar la contraseña" };
  }
};
