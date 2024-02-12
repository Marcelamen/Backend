import {
  cambioContrasenaActualServicio,
  cambioContrasenaServicio,
  loginServicio,
  olvideContraseniaServicio,
} from "../services/loginService.js";
import { logger } from "../util/logger.handle.js";
import { manejoMensajes } from "../util/manejoMensajes.handle.js";

const login = async (req, res) => {
  try {
    const {correo, contrasenia} = req.body;
    if (correo === "") {
      return res.status(400).send({error:400, mensaje:"El correo está vacío"})
    }
    if (contrasenia === "") {
      return res.status(400).send({error:400, mensaje:"La contraseña está vacía"})
    }
    
    const resp = await loginServicio(correo, contrasenia);
    if (resp == "204") {
      logger.error(`Usuario ingreso correo ${correo} no se logueo exitosamente`)
      return res.status(404).send({error:404, mensaje:"El correo o contraseña no son correctos"})
    }
    return res.status(200).send(resp);
  } catch (error) {
    logger.error("Error a la hora de loguear")
    manejoMensajes(error, res);
  }
};

const olvideContrasenia = async (req, res) => {
  const user = req.body;
  try {
    const resp = await olvideContraseniaServicio(user.correo);
    return res.status(200).send(resp);
  } catch (e) {
    manejoMensajes(error, res);
  }
};

const getCambioContrasena = async (req, res) => {
  const { id, token } = req.params;
  try {
    const resp = await cambioContrasenaServicio(id, token);
    res.send({resultado: resp});
  } catch (error) {
    manejoMensajes(error, res);
  }
};

const postCambioContrasena = async (req, res) => {
  const user = req.body;
  try {
    const resp = await cambioContrasenaActualServicio(user)
    return res.status(200).send(resp);
  } catch (e) {
    manejoMensajes(error, res);
  }
};

export { login, olvideContrasenia, getCambioContrasena, postCambioContrasena };
