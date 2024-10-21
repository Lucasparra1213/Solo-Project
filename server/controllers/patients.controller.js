import Patients from "../models/patients.model.js";

export const patientsController= {
    createPatient: async (req,res) => {
        try{
        const newPatient = await Patients.create(req.body);
        console.log(newPatient);
        res.json(newPatient);
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
        }
    },

    getAllPatient: async (req,res) => {
        try {
            const allPatient = await Patients.find();
            res.json(allPatient);
        }
        catch {
            console.log(err);
            res.status(400).json(err);
        }
    },

    getOnePatient: async (req, res) => {
        try {
            
            const patientById = await Patients.findById(req.params.id);
            
            
            if (!patientById) {
                return res.status(404).json({ message: "Patient not found" });
            }
    
            
            res.json(patientById);
        } catch (err) {
            console.error(err);
    
            
            res.status(500).json({ message: "An error occurred while fetching the patient" });
        }
    },
    

    deleteOnePatient: async (req,res) => {
        try{
            const id = req.params.id
            await Patients.findByIdAndDelete(id)
            return res.status(204).send()

        }
        catch{
            console.log(err);
            res.status(500).json(err);
        }

    },

    updateOnePatient: async (req,res) => {
        try{
            const options ={
                new: true,
                runValidators: true
            }

            const id = req.params.id
            const updatedOnePatient = await Patients.findByIdAndUpdate(id, req.body, options)
            return res.status(201).json(updatedOnePatient)
        }
        catch (err){
            console.log(err);
            res.status(400).json(err);
        }

    }

}