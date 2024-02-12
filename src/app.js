import Express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { resolve } from "path";
import { routesApi } from "./routes/index.js";
import dbConnection from "./database/database-config.js";
import { __dirname } from "./util/urlHandle.js";
import { logger } from "./util/logger.handle.js";

import bodyParser from "body-parser";

dotenv.config()
dotenv.config({ path: resolve(__dirname, `../config/.env.${process.env.NODE_ENV}`) })
const app = Express();
const PORT = process.env.PORT || 3301;
const HOST = process.env.HOST || "http://localhost:3300/";
const publicaPath = resolve(__dirname, "./public");
const url = process.env.DBSERVERLOCAL; 

app.use(cors());
app.use(bodyParser.json());
app.use(Express.static(publicaPath))
app.use(urlencoded({ extended: true }));

routesApi(app);
dbConnection();

app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  
  logger.info(`Server runing in port: ${PORT}`)
  console.log("Server runing in port:", PORT || 3001);

});

