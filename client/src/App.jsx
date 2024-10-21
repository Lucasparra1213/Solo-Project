import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './assets/components/login';
import SignUp from './assets/components/Signup';
import Home from './assets/components/home';
import AdmitPatient from './assets/components/admitPatient';
import Details from './assets/components/Details'; // Import Details component
import Update from './assets/components/Update'; // Import Update component

function App() {
  const [currentPatient, setCurrentPatient] = useState(null); // Use state to store the current patient

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:doctorName/home' element={<Home />} />
        <Route path='/:doctorName/admitPatient' element={<AdmitPatient />} />
        <Route path='/:doctorName/patient/:id/details' element={<Details setCurrentPatient={setCurrentPatient} />} /> 
        <Route path='/:doctorName/patient/:id/edit' element={<Update setCurrentPatient={setCurrentPatient} />} /> 
      </Routes>
    </>
  );
}

export default App;