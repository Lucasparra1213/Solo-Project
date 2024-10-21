import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongoose.config.js';
import patientsRoutes from './routes/patients.routes.js'
import doctorRoutes from './routes/doctor.routes.js';
const app = express();
app.use(express.json(), cors());
app.use('/api', patientsRoutes)
app.use('/api', doctorRoutes)
dotenv.config();
const PORT = process.env.PORT;
dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);

