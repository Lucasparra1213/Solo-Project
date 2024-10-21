import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to the server
      const response = await axios.post('http://localhost:8005/api/register', formData);
      setMessage('Profile created successfully!');
    } catch (err) {
      setMessage('Profile creation failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Doctor Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>

      {/* Display message after submission */}
      {message && <p className="text-center mt-3">{message}</p>}

      {/* Button to go back to login */}
      <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
