"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditPatientPage: React.FC = () => {
    const [patient, setPatient] = useState({ nombre: '', direccion: '', telefono: '' });
    const router = useRouter();
    const { rut } = router.query;

    useEffect(() => {
        if (rut) {
            axios.get(`/api/patients/${rut}`)
                .then(response => setPatient(response.data))
                .catch(error => console.error(error));
        }
    }, [rut]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/patients/${rut}`, patient)
            .then(() => router.push(`/patients/${rut}`))
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Edit Patient</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            </form>
        </div>
    );
};

export default EditPatientPage;
