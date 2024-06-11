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

    if (!consult) return <div>Cargando...</div>;

    return (
        <div>
            <h1>Consulta {consult.codigo}</h1>
            <p>Fecha: {consult.fechaConsulta}</p>
            <p>Hora: {consult.horaConsulta}</p>
            <p>Médico Tratante: {consult.medico_tratante}</p>
            <p>Número de Clínica: {consult.nro_clinica}</p>
            <p>RUT Paciente: {consult.rut}</p>
            <Link href={`/consults/${codigo}/edit`}>
                <button>Editar</button>
            </Link>
        </div>
    );
};

export default ConsultDetailPage;
