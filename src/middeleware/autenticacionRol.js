const { consultarUsuarioId } = require("../services/usuarioService");
const { verificarToken } = require("../util/jwt");

export const autenticarRolUsuario = (roles) => async (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ").pop();
    const tokenData = verificarToken(token);
    const datosUsuario = await consultarUsuarioId(tokenData.id);
    if ([].concat(roles).includes(datosUsuario.grupo)) {
      next();
    } else {
      res.status(409);
      res.send({ error: "No tienes acceso a esta página o no existe" });
    }
  } catch (error) { }
};
