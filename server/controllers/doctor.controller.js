import Doctor from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const doctorController = {
    // Register a new doctor
    registerDoctor: async (req, res) => {
        try {
            const { username, password, name } = req.body;

            // Check if the doctor already exists
            const existingDoctor = await Doctor.findOne({ username });
            if (existingDoctor) {
                return res.status(400).json({ message: 'Doctor already exists' });
            }

            // Create new doctor instance
            const doctor = new Doctor({ username, password, name });
            await doctor.save();  // Password will be hashed here due to the pre-save hook

            res.status(201).json({ message: 'Doctor registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error during doctor registration', error: err });
        }
    },

    // Login an existing doctor
    loginDoctor: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find the doctor by username
            const doctor = await Doctor.findOne({ username });
            if (!doctor) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

            // Respond with the token and doctor info
            res.json({ token, doctor: { id: doctor._id, username: doctor.username, role: doctor.role, name: doctor.name } });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error during login', error: err });
        }
    }
};
