import React, { useState } from 'react';
import Register from '../Register/Register';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/users?email=${formData.email}&password=${formData.password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }

      const data = await response.json();
      console.log('User logged in successfully:', data);
      localStorage.setItem("Name", data.name);
      localStorage.setItem("Id", data._id);
      setError('');

      // Set user in parent component
      console.log(data); // Assuming the data returned from the server contains user information

      // Clear form data
      setFormData({
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="container"> {/* Asigna la clase contenedora */}
      <div className="form-container"> {/* Agrega un contenedor para el formulario */}
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
        <Register />
    </div>
  );
};

export default Login;
