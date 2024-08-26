import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const { pharmacyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/medicines/${pharmacyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching medicines:', error.response.data.message);
      }
    };

    fetchMedicines();
  }, [pharmacyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/medicines', { name, description, price, discount, pharmacy: pharmacyId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setName('');
      setDescription('');
      setPrice('');
      setDiscount('');
      // Refresh the medicine list
      const response = await axios.get(`http://localhost:5000/api/medicines/${pharmacyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMedicines(response.data);
    } catch (error) {
      console.error('Error creating medicine:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Medicines for Pharmacy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <br />
        <label>
          Discount:
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Medicine</button>
      </form>
      <ul>
        {medicines.map(medicine => (
          <li key={medicine._id}>
            <h3>{medicine.name}</h3>
            <p>Description: {medicine.description}</p>
            <p>Price: ${medicine.price}</p>
            <p>Discount: ${medicine.discount}</p>
            {/* Add edit and delete functionality as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
