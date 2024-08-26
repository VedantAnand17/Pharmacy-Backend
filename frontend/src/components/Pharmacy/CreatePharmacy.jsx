import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePharmacy = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/pharmacies', { name, address, contact }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/pharmacies'); // Redirect to pharmacies page after creation
    } catch (error) {
      console.error('Error creating pharmacy:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create Pharmacy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <br />
        <label>
          Contact:
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Pharmacy</button>
      </form>
    </div>
  );
};

export default CreatePharmacy;
