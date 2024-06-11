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
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Consultations</h1>
            <Link href="/consults/add">
                <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Consultation</span>
            </Link>
            <ul className="mt-4">
                {consults.length > 0 ? consults.map(consult => (
                    <li key={consult.codigo} className="border p-4 mb-2 rounded">
                        <Link href={`/consults/${consult.codigo}`}>
                            <span className="text-blue-500 hover:underline">{consult.fechaConsulta} - {consult.horaConsulta}</span>
                        </Link>
                    </li>
                )) : <p>No consultations available</p>}
            </ul>
        </div>
    );
};

export default ConsultsPage;
