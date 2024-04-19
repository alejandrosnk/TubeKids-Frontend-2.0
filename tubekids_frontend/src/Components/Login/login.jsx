import { useState} from 'react';
import { Navigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const userId=localStorage.getItem("Id");
  const save=localStorage.getItem("Save");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const Activate = () => {
  fetch(`http://localhost:3001/api/users?id=${userId}`, {
      method: 'PATCH', // Método HTTP para actualizar el usuario
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to activate user');
        }
        return response.json();
      })
      .then(data => {
        // Aquí puedes hacer algo con la respuesta del servidor, como actualizar el estado de tu aplicación o mostrar un mensaje de éxito.
      })
      .catch(error => {
        console.error(error);
      });
    };

  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

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
      setLoggedIn(true);

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
  if (save) {
    Activate();
    localStorage.removeItem("Save")
  }

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <>
    <div className="wrapper">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className='input-box'>
          <input className='input' type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
        </div>
        <div className='input-box'>
          <input className='input' type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
        </div>
        <button className='button' type="submit">Login</button>
        
        <div className='register-link'>
              <Link to="/register" className="playlist-button">Sign up</Link>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
