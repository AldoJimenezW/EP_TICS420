"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ConsultDetailPage: React.FC = () => {
    const [consult, setConsult] = useState(null);
    const router = useRouter();
    const { codigo } = router.query;

    useEffect(() => {
        if (codigo) {
            axios.get(`/api/consults/${codigo}`)
                .then(response => setConsult(response.data))
                .catch(error => console.error(error));
        }
    }, [codigo]);

    if (!consult) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Consultation {consult.codigo}</h1>
            <p><strong>Fecha:</strong> {consult.fechaConsulta}</p>
            <p><strong>Hora:</strong> {consult.horaConsulta}</p>
            <p><strong>Médico Tratante:</strong> {consult.medico_tratante}</p>
            <p><strong>Número de Clínica:</strong> {consult.nro_clinica}</p>
            <p><strong>RUT Paciente:</strong> {consult.rut}</p>
            <Link href={`/consults/${codigo}/edit`}>
                <span className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700">Edit</span>
            </Link>
        </div>
    );
};

export default ConsultDetailPage;
