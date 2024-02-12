import { Router } from "express";
import {
  getCambioContrasena,
  login,
  olvideContrasenia,
  postCambioContrasena,
} from "../../controllers/loginController.js";
const router = Router();

router.post("/login", login);
router.post("/olvideContrasenia", olvideContrasenia);
router.post("/nuevaContrasena", postCambioContrasena);
router.get("/cambioContrasena/:id/:token", getCambioContrasena);

export default router;
