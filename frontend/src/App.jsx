import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreatePharmacy from './components/Pharmacy/CreatePharmacy';
import PharmacyList from './components/Pharmacy/PharmacyList';
import MedicineList from './components/Medicine/MedicineList';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-pharmacy" element={<CreatePharmacy />} />
          <Route path="/pharmacies" element={<PharmacyList />} />
          <Route path="/medicines/:pharmacyId" element={<MedicineList />} />
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
