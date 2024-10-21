import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdmitPatient = (props) => {
const { doctorName } = useParams(); 
const [age, setAge] = useState('');
const [name, setName] = useState('');
const [observations, setObservations] = useState('');
const [appointments, setAppointments] = useState('');
const navigate = useNavigate();
const [errors, setErrors] = useState({});

const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8005/api/patients", {
    age: age,
    name: name,
    observations: observations,
    appointments: appointments,
    })
    .then((res) => {
        console.log(res);
        navigate(`/${doctorName}/home`); 
    })
    .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors); // Safely handle errors
        } else {
          setErrors({ general: 'An error occurred' }); // Handle non-validation errors
        }
    });
};

return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Register a Patient</h2>

    <form onSubmit={submitHandler} className="w-50 mx-auto">
        {/* Age Input */}
        <div className="mb-3">
        <label className="form-label">Age</label>
        <input
            type="number"
            className="form-control"
            value={age}
            placeholder="Age..."
            onChange={(e) => setAge(e.target.value)}
        />
          {errors && errors.age && <p className="text-danger">{errors.age.message}</p>} {/* Safely check errors.age */}
        </div>

        {/* Name Input */}
        <div className="mb-3">
        <label className="form-label">Name</label>
        <input
            type="text"
            className="form-control"
            value={name}
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
        />
          {errors && errors.name && <p className="text-danger">{errors.name?.message}</p>} {/* Safely check errors.name */}
        </div>

        {/* Observations Input */}
        <div className="mb-3">
        <label className="form-label">Observations</label>
        <input
            type="text"
            className="form-control"
            value={observations}
            placeholder="Observations..."
            onChange={(e) => setObservations(e.target.value)}
        />
          {errors && errors.observations && <p className="text-danger">{errors.observations?.message}</p>} {/* Safely check errors.observations */}
        </div>

        {/* Appointments Input */}
        <div className="mb-3">
        <label className="form-label">Appointments</label>
        <input
            type="date"
            className="form-control"
            value={appointments}
            placeholder="Next Appointment..."
            onChange={(e) => setAppointments(e.target.value)}
        />
          {errors && errors.appointments && <p className="text-danger">{errors.appointments?.message}</p>} {/* Safely check errors.appointments */}
        </div>

        {/* General error */}
        {errors.general && <p className="text-danger">{errors.general}</p>} {/* Handle general errors */}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Admit</button>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(`/${doctorName}/home`)}>Home</button>
    </form>
    </div>
);
};

export default AdmitPatient;
