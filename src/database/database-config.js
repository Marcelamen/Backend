import dotenv from "dotenv";
import { connect } from "mongoose";
import { resolve } from "path";
import { __dirname } from "../util/urlHandle.js";
import { logger } from "../util/logger.handle.js";

dotenv.config();
dotenv.config({ path: resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`) });

const url = process.env.DBSERVERLOCAL;

async function dbConnect() {
  try {
    await connect(url);
    logger.info("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error(error);
    logger.error("Error al conectar con la base de datos");
    throw new Error(error);
  }
}

export default dbConnect;
