import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [children, setChildren] = useState([]);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleLogin = async (childId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/childrenLogin?id=${childId}&pin=${pin}`);
      if (!response.ok) {
        throw new Error('Error logging in child');
      }
      const data = await response.json();
      console.log('Child logged in successfully:', data);
      setError('');
    } catch (error) {
      console.error('Error logging in child:', error);
      setError('Error logging in child. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to="/adminKids"><button>Administration Kids</button></Link>
      <Link to="/adminPlaylist"><button>Administration Playlist</button></Link>
      <ul>
        {children.map(child => (
          <li key={child._id}>
            <p>Name: {child.name}</p>
            <p>PIN: {child.pin}</p>
            <p>Avatar: {child.avatar}</p>
            <input 
              type="text" 
              placeholder="Enter PIN" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
            />
            <button onClick={() => handleLogin(child._id)}>Login</button>
          </li>
        ))}
      </ul>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Home;
