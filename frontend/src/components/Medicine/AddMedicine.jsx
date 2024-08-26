// src/components/AddMedicine.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [pharmacy, setPharmacy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/medicines', {
        name,
        description,
        price,
        discount,
        pharmacy,
      });
      alert('Medicine added successfully');
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert('Error adding medicine');
    }
  };

  return (
    <div>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Discount:</label>
          <input type="number" step="0.01" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <div>
          <label>Pharmacy ID:</label>
          <input type="text" value={pharmacy} onChange={(e) => setPharmacy(e.target.value)} required />
        </div>
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
