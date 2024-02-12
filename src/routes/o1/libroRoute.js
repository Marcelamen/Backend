import { Router } from "express";
import { crearLibro, obtenerLibros, obtenerLibroId, eliminarLibro } from "../../controllers/libroController.js";

const router = Router();

router.post("/libro", crearLibro);
router.get("/libro", obtenerLibros);
router.get("/libro/:id", obtenerLibroId); // Corregí la URL para obtener un libro por ID
router.delete("/libro/:id", eliminarLibro); // Corregí la URL para eliminar un libro por ID

export default router;