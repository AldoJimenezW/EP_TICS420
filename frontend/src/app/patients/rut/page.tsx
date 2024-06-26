"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const PatientDetailPage: React.FC = () => {
    const [patient, setPatient] = useState(null);
    const router = useRouter();
    const { rut } = router.query;

    useEffect(() => {
        if (rut) {
            axios.get(`/api/patients/${rut}`)
                .then(response => setPatient(response.data))
                .catch(error => console.error(error));
        }
    }, [rut]);

    if (!patient) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{patient.nombre}</h1>
            <p><strong>Dirección:</strong> {patient.direccion}</p>
            <p><strong>Teléfono:</strong> {patient.telefono}</p>
            <Link href={`/patients/${rut}/edit`}>
                <span className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit</span>
            </Link>
        </div>
    );
};

export default PatientDetailPage;
