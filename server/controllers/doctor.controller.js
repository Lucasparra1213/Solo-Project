import Doctor from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const doctorController = {
    
    registerDoctor: async (req, res) => {
        try {
            const { username, password, name } = req.body;

            
            const existingDoctor = await Doctor.findOne({ username });
            if (existingDoctor) {
                return res.status(400).json({ message: 'Doctor already exists' });
            }

            
            const doctor = new Doctor({ username, password, name });
            await doctor.save();  

            res.status(201).json({ message: 'Doctor registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error during doctor registration', error: err });
        }
    },

    
    loginDoctor: async (req, res) => {
        try {
            const { username, password } = req.body;

            
            const doctor = await Doctor.findOne({ username });
            if (!doctor) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

        
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

            
            res.json({ token, doctor: { id: doctor._id, username: doctor.username, role: doctor.role, name: doctor.name } });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error during login', error: err });
        }
    }
};
