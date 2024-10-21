import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = ({ setCurrentPatient }) => {
    const [age, setAge] = useState('');
    const [name, setName]= useState('');
    const [observations, setObservations] = useState('');
    const [appointments, setAppointments] = useState('');
    const { doctorName, id  } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8005/api/patients/${id}`) 
            .then((res) => {
                setAge(res.data.age);
                setName(res.data.name);
                setObservations(res.data.observations);
                setAppointments(res.data.appointments);
                setCurrentPatient(res.data); 
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, setCurrentPatient]);

    const updateHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8005/api/patients/${id}`, { 
            age: age,
            name: name,
            observations: observations,
            appointments: appointments,
        })
        .then((res) => {
            navigate(`/${doctorName}/patient/${id}/details`);
        })
        .catch((err) => {
            setErrors(err.response.data.errors);
        });
    };

    return (
        <div className="container mt-5">
            <h2>Update Patient</h2>
            <form onSubmit={updateHandler} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input 
                        type="number" 
                        className="form-control"
                        value={age} 
                        placeholder="Age..." 
                        onChange={(e) => setAge(e.target.value)} 
                    />
                    {errors.age && <p className="text-danger">{errors.age.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={name} 
                        placeholder="Name..." 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Observations</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={observations} 
                        placeholder="Observations..." 
                        onChange={(e) => setObservations(e.target.value)} 
                    />
                    {errors.observations && <p className="text-danger">{errors.observations.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Appointments</label>
                    <input 
                        type="date" 
                        className="form-control"
                        value={appointments} 
                        placeholder="Next Appointment..." 
                        onChange={(e) => setAppointments(e.target.value)} 
                    />
                    {errors.appointments && <p className="text-danger">{errors.appointments.message}</p>}
                </div>

                <button className="btn btn-primary">Update</button>
                <button className="btn btn-secondary ml-3 mt-3" onClick={() => navigate(`/${doctorName}/home`)}>Home</button>
            </form>
        </div>
    );
};

export default Update;
