
export const obtenerPrimerNombre = (nombre) => {
  const primerNombre = nombre.split(' ');
  return primerNombre[0];
}


export const renombrarAvatar=(nombreOriginal)=>{
  const prefijoUnico = Math.round(Math.random() * 1e5);
  const nombreArchivo = prefijoUnico + "ASD2_" + nombreOriginal.split(".")[0] + ".webp";
  return nombreArchivo;
}