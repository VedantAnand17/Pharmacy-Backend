import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Medlr</h1>
            <p>Manage your pharmacies and medicines efficiently.</p>
            <Link to="/pharmacies">View Pharmacies</Link> | 
            <Link to="/medicines">View Medicines</Link>
        </div>
    );
}

export default Home;
