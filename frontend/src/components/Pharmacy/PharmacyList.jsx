import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/pharmacies', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { name: search }
        });

        if (response.data.length === 0) {
          navigate('/create-pharmacy');
        } else {
          setPharmacies(response.data);
        }
      } catch (error) {
        console.error('Error fetching pharmacies:', error.response?.data?.message || error.message);
      }
    };

    fetchPharmacies();
  }, [search, navigate]);

  return (
    <div>
      <h2>Your Pharmacies</h2>
      <input
        type="text"
        placeholder="Search pharmacies by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {pharmacies.length > 0 ? (
        <ul>
          {pharmacies.map(pharmacy => (
            <li key={pharmacy._id}>
              <h3>{pharmacy.name}</h3>
              <p>Address: {pharmacy.address}</p>
              <p>Contact: {pharmacy.contact}</p>
              <button onClick={() => navigate(`/medicines/${pharmacy._id}`)}>Manage Medicines</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pharmacies found</p>
      )}
    </div>
  );
};

export default PharmacyList;
