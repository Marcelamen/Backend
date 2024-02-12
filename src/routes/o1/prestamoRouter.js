import { Router } from "express";
import { crearPrestamo, eliminarPrestamo, actualizarPrestamo, obtenerTPrestamo, obtenerTPrestamoId } from "../../controllers/prestamoController.js";

const router = Router();

router.post("/prestamo", crearPrestamo);
router.delete("/prestamo/:id", eliminarPrestamo); // Corregí la URL para eliminar un préstamo por ID
router.put("/prestamo/:id", actualizarPrestamo); // Corregí la URL para actualizar un préstamo por ID
router.get("/prestamo", obtenerTPrestamo);
router.get("/prestamo/:id", obtenerTPrestamoId); // Corregí la URL para obtener un préstamo por ID

export default router;