import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const Details = ({ setCurrentPatient }) => {
    const [patient, setPatient] = useState({});
    const { doctorName, id } = useParams();
    const navigate = useNavigate();

    const dischargeHandler = () => {
        axios.delete(`http://localhost:8005/api/patients/${id}`) // Update the URL to /patients
            .then((res) => {
                navigate (`/${doctorName}/home`);
            })
            .catch((err) => {
                console.log(err); 
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:8005/api/patients/${id}`) // Update the URL to /patients
            .then((res) => {
                setPatient(res.data);
                setCurrentPatient(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, setCurrentPatient]);

    return (
        <div className="container mt-5">
            <h1>Patient Details</h1>
            <h2>Age: {patient.age}</h2>
            <h2>Name: {patient.name}</h2>
            <h2>Observations: {patient.observations}</h2>
            <h2>Appointments: {new Date(patient.appointments).toLocaleDateString()}</h2>

            <button className="btn btn-danger" onClick={dischargeHandler}>Discharge Patient</button>

            <button className="btn btn-primary ms-3">
                <Link to={`/${doctorName}/patient/${patient._id}/edit`} className="text-light text-decoration-none">Update</Link>
            </button>
            <button className="btn btn-secondary ms-3" onClick={() => navigate(`/${doctorName}/home`)}>Home</button>

        </div>
    );
};

export default Details;
