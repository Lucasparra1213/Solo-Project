import { Router } from "express";
import { patientsController } from "../controllers/patients.controller.js";


const router = Router()

router.route('/patients')
    .post(patientsController.createPatient)
    .get(patientsController.getAllPatient)

router.route('/patients/:id')
    .get(patientsController.getOnePatient)
    .delete(patientsController.deleteOnePatient)
    .put(patientsController.updateOnePatient)

export default router;