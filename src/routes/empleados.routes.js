import { Router } from "express";
import { getEmpleados, getUnEmpleado, createEmpleados, updateEmpleado, deleteEmpleados} from "../controllers/empleados.controller.js";
const router = Router()

router.get('/empleados', getEmpleados);
router.get('/empleados/:ID', getUnEmpleado);
router.post('/empleados', createEmpleados);
router.patch('/empleados/:ID', updateEmpleado);
router.delete('/empleados/:ID', deleteEmpleados);

export default router