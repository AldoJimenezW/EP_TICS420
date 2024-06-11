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
        <div>
            <h1>Pacientes</h1>
            <Link href="/patients/add">
                <button>Añadir Paciente</button>
            </Link>
            <ul>
                {patients.map(patient => (
                    <li key={patient.rut}>
                        <Link href={`/patients/${patient.rut}`}>
                            {patient.nombre}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientsPage;
