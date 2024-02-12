import { usuarioModel } from "../models/usuarioModel.js";
import { encriptarContrasena, verificarClave } from "../util/bcript.js";

  const getUsuariosServicio = async () => {
    const usuarios = await usuarioModel.find(
      {},
      {
        nombres: 1,
        apellidos: 1,
        correo: 1,
        cargo: 1,
        foto: 1,
        id: 1,
      }
    );
    return usuarios;
  };

  const crearUsuarioServicio = async (usuario) => {
    const usuarioexiste = await usuarioExisteServicio(usuario.correo);
    if (usuarioexiste) {
      return "400";
    }
    const clave = await encriptarContrasena("GrupoASD123");
    usuario.contrasenia = clave;
    // usuario.insertDate = new Date();
    const nuevoUsuario = new usuarioModel(usuario)
    nuevoUsuario.save();
    return nuevoUsuario;
  };

  const usuarioExisteServicio = async (correo) => {
    const usuario = await usuarioModel.findOne({ correo });
    if (usuario == null) {
      return false;
    }
    return true;
  };

  const actualizarFotoServicio = async (id, nombreFoto) => {
    const usuario = await usuarioModel.updateOne(
      {
        _id: id,
      },
      {
        foto: nombreFoto,
      }
    );
    return usuario;
  };


  const cambioContrasenaServicio = async (usuario) => {
    const busquedaUsuario = await usuarioModel.findOne({
      correo: usuario.correo,
    });
    if (busquedaUsuario == null) {
      return "460"; //Usuario no existe
    } else {
      const comparacionClave = await verificarClave(
        usuario.contrasenia,
        busquedaUsuario.contrasenia
      );
      if (!comparacionClave) {
        return "470";
      } else {
        const clave = await encriptarContrasena(usuario.nueva);
        await usuarioModel.updateOne(
          { correo: usuario.correo },
          {
            contrasenia: clave,
          }
        );
        return "230";
      }
    }
  };


  const consultarFoto = async (id) => {
    const usuarioFoto = await usuarioModel.findById(id, { foto: 1 });
    if (usuarioFoto.foto != "") {
      console.log(usuarioFoto);
      return usuarioFoto.foto;
    }
    return false;
  };

  export const obtenerFotoPerfilServicio = async(id) => {
    const usuario = await usuarioModel.findOne({_id:id}, {_id:0, foto:1});
    return usuario.foto;
  }
  export const buscarIdPorCorreoServicio = async (correo) => {
    const usuario = await usuarioModel.findOne({ correo }, { _id: 1 });
    return usuario ? usuario._id : null;
  };

  export {
    getUsuariosServicio,
    crearUsuarioServicio,
    cambioContrasenaServicio,
    actualizarFotoServicio,
    consultarFoto,
  };
