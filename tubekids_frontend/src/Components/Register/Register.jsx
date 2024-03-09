import React, { useState } from 'react';
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
    console.log(formData);
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
      console.log('User registered successfully:', data);
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

  return (
    <div id="register-container">
      <h2 class="register-title">Create User</h2>
      {error && <div class="error-message">{error}</div>}
      <form class="register-form" onSubmit={handleSubmit}>
        <input type="email" class="register-input" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
        <input type="password" class="register-input" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
        <input type="password" class="register-input" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} />
        <input type="text" class="register-input" name="pin" placeholder="PIN (6 digits) *" value={formData.pin} onChange={handleChange} required />
        <input type="text" class="register-input" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input type="text" class="register-input" name="lastname" placeholder="Lastname *" value={formData.lastname} onChange={handleChange} required />
        <input type="text" class="register-input" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input type="date" class="register-input" name="fechaNacimiento" placeholder="Fecha de Nacimiento *" value={formData.fechaNacimiento} onChange={handleChange} required />
        <button type="submit" class="register-button">Create User</button>
      </form>
    </div>

  );
}

export default Register