import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const AdministrationPlaylist = () => {

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    user: localStorage.getItem("Id")
  });

  const [error, setError] = useState('');

  const [videos, setVideos] = useState([]);

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
      const response = await fetch('http://localhost:3001/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error creating playlist');
      }

      const data = await response.json();
      console.log('Playlist created successfully:', data);
      setError('');

      setFormData({
        name: '',
        url: '',
        user: localStorage.getItem("Id")
      });
      fetchData();
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Error creating playlist. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/videos?id=${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting video');
      }
      setVideos(prevVideos => prevVideos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      setError('Error deleting video. Please try again later.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/videos?id=${localStorage.getItem("Id")}`);
      if (!response.ok) {
        throw new Error('Error fetching videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Error fetching videos. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="playlist-container">
      <h2>Create Playlist</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name of video *" value={formData.name} onChange={handleChange} required />
        <input type="text" name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        <button type="submit">Create Playlist</button>
      </form>
      <h2>Playlist</h2>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <p>Name: {video.name}</p>
            <div>
              <ReactPlayer
                url={video.url}
                loop
                controls
              />
            </div>
            <button onClick={() => handleDelete(video._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrationPlaylist;
