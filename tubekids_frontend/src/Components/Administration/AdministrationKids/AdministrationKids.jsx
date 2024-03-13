import React, { useState, useEffect } from 'react';

const AdministrationKids = () => {
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    avatar: '',
    age: '',
    user: localStorage.getItem("Id")
  });

  const [error, setError] = useState('');
  const [children, setChildren] = useState([]);

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
      const response = await fetch('http://localhost:3001/api/childrens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error creating child');
      }

      const data = await response.json();
      console.log('Child created successfully:', data);
      setError('');

      setFormData({
        name: '',
        pin: '',
        avatar: '',
        age: '',
        user: localStorage.getItem("Id")
      });

      // Actualizar la lista de niños
      fetchChildren();
    } catch (error) {
      console.error('Error creating child:', error);
      setError('Error creating child. Please try again later.');
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrens?id=${localStorage.getItem("Id")}`);
      if (!response.ok) {
        throw new Error('Error fetching children');
      }
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error('Error fetching children:', error);
      setError('Error fetching children. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrens?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error deleting child');
      }

      // Actualizar la lista de niños
      fetchChildren();
    } catch (error) {
      console.error('Error deleting child:', error);
      setError('Error deleting child. Please try again later.');
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div className="children-container">
      <h2>Create Child</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input type="text" name="pin" placeholder="PIN *" value={formData.pin} onChange={handleChange} required />
        <input type="text" name="avatar" placeholder="Avatar" value={formData.avatar} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} required />
        <button type="submit">Create Child</button>
      </form>
      <h2>Children</h2>
      <ul>
        {children.map(child => (
          <li key={child._id}>
            <p>Name: {child.name}</p>
            <p>PIN: {child.pin}</p>
            <p>Avatar: {child.avatar}</p>
            <p>Age: {child.age}</p>
            <button onClick={() => handleDelete(child._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrationKids