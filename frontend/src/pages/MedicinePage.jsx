import React from 'react';
import MedicineList from '../components/Medicine/MedicineList';
import MedicineForm from '../components/Medicine/MedicineForm';

function MedicinePage() {
    return (
        <div>
            <h1>Medicines</h1>
            <MedicineForm />
            <MedicineList />
        </div>
    );
}

export default MedicinePage;