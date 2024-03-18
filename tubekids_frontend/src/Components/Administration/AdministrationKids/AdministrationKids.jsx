import React, { useState, useEffect } from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const AdministrationKids = () => {

  const [children, setChildren] = useState([]);

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
      fetchChildren();
    } catch (error) {
      console.error('Error deleting child:', error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div className="children-container">
      <h2>Children</h2>
      <Link to="/createNewProfile">
        <button>Create new profile</button>
      </Link>
      <ul>
        {children.map(child => (
          <li key={child._id}>
            <p>Name: {child.name}</p>
            <p>PIN: {child.pin}</p>
            <img src={child.avatar} alt='avatar'></img>
            <p>Age: {child.age}</p>
            <button onClick={() => handleDelete(child._id)}>Delete</button>
            <Link to="/createEditProfile">
              <button>Edit profile</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrationKids;
