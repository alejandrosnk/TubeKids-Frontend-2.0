import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    pin: '',
    name: '',
    lastname: '',
    country: '',
    fechaNacimiento: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
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

    // Validación de la contraseña
    if (formData.password !== formData.repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      const data = await response.json();
      console.log(formData);
      console.log('User registered successfully:', data);
      localStorage.setItem("Name", data.name);
      localStorage.setItem("Id", data._id);
      setLoggedIn(true);
      setError('');

      setFormData({
        email: '',
        password: '',
        repeatPassword: '',
        pin: '',
        name: '',
        lastname: '',
        country: '',
        fechaNacimiento: ''
      }); 
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again later.');
    }
  };
  if (loggedIn) {
    return <Navigate to="/home" />; 
  }

  return (
    <div id="register-container">
      <h2 className="register-title">Create User</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="email" className="register-input" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
        <input type="password" className="register-input" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
        <input type="password" className="register-input" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} required />
        <input type="text" className="register-input" name="pin" placeholder="PIN (6 digits) *" value={formData.pin} onChange={handleChange} required />
        <input type="text" className="register-input" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input type="text" className="register-input" name="lastname" placeholder="Lastname *" value={formData.lastname} onChange={handleChange} required />
        <input type="text" className="register-input" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input type="date" className="register-input" name="fechaNacimiento" placeholder="Fecha de Nacimiento *" value={formData.fechaNacimiento} onChange={handleChange} required />
        <button type="submit" className="register-button">Create User</button>
      </form>
    </div>
  );
}


export default Register;
