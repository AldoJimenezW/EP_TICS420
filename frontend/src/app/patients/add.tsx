"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddPatientPage: React.FC = () => {
    const [patient, setPatient] = useState({ rut: '', nombre: '', direccion: '', telefono: '' });
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/patients', patient)
            .then(() => router.push('/patients'))
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Add Patient</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    RUT:
                    <input type="text" name="rut" value={patient.rut} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-2">
                    Nombre:
                    <input type="text" name="nombre" value={patient.nombre} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-2">
                    Dirección:
                    <input type="text" name="direccion" value={patient.direccion} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-4">
                    Teléfono:
                    <input type="text" name="telefono" value={patient.telefono} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
            </form>
        </div>
    );
};

export default AddPatientPage;
