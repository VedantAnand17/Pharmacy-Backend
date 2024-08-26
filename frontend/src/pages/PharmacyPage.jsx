import React from 'react';
import PharmacyList from '../components/Pharmacy/PharmacyList';
import PharmacyForm from '../components/Pharmacy/PharmacyForm';

function PharmacyPage() {
    return (
        <div>
            <h1>Pharmacies</h1>
            <PharmacyForm />
            <PharmacyList />
        </div>
    );
}

export default PharmacyPage;
