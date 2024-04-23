import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const AdiministrationCollection = () => {

    const [lists, setLists] = useState([]);
    const [error, setError] = useState('');
    const [update, setUpdate] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/collections?userId=${localStorage.getItem("Id")}`);
            if (!response.ok) {
                throw new Error('Error fetching collections');
            }
            const data = await response.json();
            setLists(data);
        } catch (error) {
            console.error('Error fetching collections:', error);
            setError('Error fetching collections. Please try again later.');
        }
    };

    const handleDelete = async (id, collection) => {
        try {
            const response = await fetch(`http://localhost:3001/api/collections?id=${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error deleting list');
            }
            setLists(prevLists => prevLists.filter(list => list._id !== id));
        } catch (error) {
            console.error('Error deleting list:', error);
            setError('Error deleting list. Please try again later.');
        }
    };
    
    const handleEdit = async (collection) => {
        localStorage.setItem("List",  JSON.stringify(collection) );
        setUpdate(true);
    }
    


    useEffect(() => {
        fetchData();
    }, []);
    
    if(update){
        return <Navigate to="/editCollection" />;
    }

    return (
        <>
            <div className="playlist-container">
                <Link className='buttonh' to="/" >Log out</Link>
                <Link className='buttonh' to="/home" >Home</Link>
                <Link to="/createCollection" className="buttonh">Create new collection</Link>
                {error && <div className="error-message">{error}</div>}
                <div>
                    {lists.map(collection => (
                        <div key={collection._id}>
                            <h3>{collection.name}</h3>
                            <p>Videos: {collection.videos}</p>
                            <div className="video-controls">
                                <button className="video-delete" onClick={() => handleDelete(collection._id, collection)}>Delete</button>
                                <button className="video-edit" onClick={() => handleEdit(collection)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdiministrationCollection