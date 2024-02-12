import { compare, hash } from "bcrypt";

/***
 * Función que encripta un texto
 *  @param {clave} clave
 *  @returns {String}
 *  */
const encriptarContrasena = async (clave) => {
  const claveEncriptada = await hash(clave, 8);
  return claveEncriptada;
};

const verificarClave = async(clave, claveEncriptada) => {
  const esCorrecto = await compare(clave, claveEncriptada);
  return esCorrecto;
}
export { encriptarContrasena, verificarClave };
