"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const PatientsPage: React.FC = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('/api/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Patients</h1>
            <Link href="/patients/add">
                <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Patient</span>
            </Link>
            <ul className="mt-4">
                {patients.length > 0 ? patients.map(patient => (
                    <li key={patient.rut} className="border p-4 mb-2 rounded">
                        <Link href={`/patients/${patient.rut}`}>
                            <span className="text-blue-500 hover:underline">{patient.nombre}</span>
                        </Link>
                    </li>
                )) : <p>No patients available</p>}
            </ul>
        </div>
    );
};

export default PatientsPage;
