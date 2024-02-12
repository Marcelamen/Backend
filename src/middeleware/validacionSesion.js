import { verificarToken } from "../util/jwt.js";

export const autenticacionSesion = (req, res, next) => {
  try {
    const tokenUsuario = req.headers.authorization || "";
    const token = tokenUsuario.split(" ").pop();
    const tokenValido = verificarToken(token);
    if (!tokenValido) {
      res
        .status(401)
        .send({ error: "401", mensaje: "Token de sesión no valido" });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(error?.status || 401)
      .send(error?.message || "Error en validación de sesión");
  }
};

