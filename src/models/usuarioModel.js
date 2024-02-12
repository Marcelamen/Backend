import { Schema, model } from "mongoose";
const usuarioSchema = new Schema(
    {
      nombres: String,
      apellidos: String,
      foto: { type: String, default: "" },
      correo: String,
      celular: String,
      contrasenia: String,
    },
    { versionKey: false, timestamps: true }
  );
  const usuarioModel = model("usuarios", usuarioSchema);
 
  export { usuarioModel };
