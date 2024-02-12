import { Router } from "express";
import { cambioContrasena, crearUsuario,  getUsuarios } from "../../controllers/usuarioController.js";
import { cargarImagenPerfil, getAvatar, getAvatarPerfil } from "../../controllers/documentoController.js";
import cargarAvatarMiddleware  from "../../middeleware/cargarAvatar.js";


const router = Router();

router.get("/usuarios", getUsuarios);


router.post("/usuarios", crearUsuario);


router.post("/cambioContrasena", cambioContrasena);


router.put('/usuarios/:id/avatar', cargarAvatarMiddleware, cargarImagenPerfil);


router.get('/usuarios/:id/avatar', getAvatar)

router.get('/usuarios/perfil/:id', getAvatarPerfil)

export default router;
