import { Router } from "express";
import { doctorController } from "../controllers/doctor.controller.js";

const router = Router();


router.post('/register', doctorController.registerDoctor);


router.post('/login', doctorController.loginDoctor);

export default router;
