"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ConsultsPage: React.FC = () => {
    const [consults, setConsults] = useState([]);

    useEffect(() => {
        axios.get('/api/consults')
            .then(response => setConsults(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Consultas</h1>
            <Link href="/consults/add">
                <button>Añadir Consulta</button>
            </Link>
            <ul>
                {consults.map(consult => (
                    <li key={consult.codigo}>
                        <Link href={`/consults/${consult.codigo}`}>
                            {consult.fechaConsulta} - {consult.horaConsulta}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsultsPage;
