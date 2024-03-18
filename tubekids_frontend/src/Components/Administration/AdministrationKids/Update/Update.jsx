import React, { useState } from 'react';

const Update = ({ childData }) => {
  const [formData, setFormData] = useState({
    name: childData.name,
    pin: childData.pin,
    age: childData.age
  });
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrens?id=${childData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error updating child');
      }
      
      // Manejar la actualización exitosa de alguna manera (por ejemplo, mostrar un mensaje de éxito)
    } catch (error) {
      console.error('Error updating child:', error);
      setError('Error updating child. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      <h2>Update Child</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
        <input type="text" name="pin" placeholder="PIN *" value={formData.pin} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} required />
        <button type="submit">Update Child</button>
      </form>
    </>
  );
};

export default Update;
