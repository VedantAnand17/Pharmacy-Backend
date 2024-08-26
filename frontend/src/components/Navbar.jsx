import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Pharmacy Management</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/pharmacies">Pharmacies</Link></li>
        <li><Link to="/medicines">Medicines</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
