import React from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const { doctorName } = useParams();
    const [ patients, setPatients] =useState([])

    useEffect(() => {
        axios.get("http://localhost:8005/api/patients")
        .then((res) =>{
            console.log(res.data)
            const today = new Date();
            const incomingPatients = res.data.filter(patients =>{
                const appointmentDate = new Date(patients.appointments);
                return appointmentDate >= today;
            })
            setPatients(incomingPatients);
        }) .catch((err) =>{
            console.log(err)
            console.log("Error fetching data")
        })
    },[])


    return (
        <div className="container mt-5">
        <h1 className="text-center">Welcome, Dr. {doctorName}!</h1>
    
        <table className="table mt-4">
            <thead>
            <tr>
                <th>Name</th>
                <th>Age</th> 
                <th>Observations</th>
                <th>Appointments</th>
            </tr>
            </thead>
            <tbody>
            {patients.map((patient) => (
                <tr key={patient._id}>
                <td>
                    <Link to={`/${doctorName}/patient/${patient._id}/details`}>
                    {patient.name}
                    </Link> 
                </td>
                <td>{patient.age}</td>
                <td>{patient.observations}</td>
                <td>{new Date(patient.appointments).toLocaleDateString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    
        
        <div className="text-center mt-4">
            <Link to={`/${doctorName}/admitPatient`} className="btn btn-primary">
            Add New Patient
            </Link>
        </div>
        </div>
    );
    };
    
    export default Home;
