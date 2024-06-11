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

    if (!patient) return <div>Cargando...</div>;

    return (
        <div>
            <h1>{patient.nombre}</h1>
            <p>Dirección: {patient.direccion}</p>
            <p>Teléfono: {patient.telefono}</p>
            <Link href={`/patients/${rut}/edit`}>
                <button>Editar</button>
            </Link>
        </div>
    );
};

export default PatientDetailPage;

