import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProperty.css';

const AddProperty = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [pimage, setPimage] = useState(''); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}properties`, {
        title,
        price,
        location,
        description,
        pimage 
      });
      alert('Property listed successfully!');
      navigate('/properties');
    } catch (error) {
      alert('Error listing property');
    }
  };

  return (
    <div className="form-container">
      <h2>List Your Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Property Image URL"
          value={pimage}
          onChange={(e) => setPimage(e.target.value)} // Track image input
        />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
