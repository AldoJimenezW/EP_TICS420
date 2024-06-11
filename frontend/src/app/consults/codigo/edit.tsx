patient"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditConsultPage: React.FC = () => {
    const [consult, setConsult] = useState({ fechaConsulta: '', horaConsulta: '', medico_tratante: '', nro_clinica: 0, rut: '' });
    const router = useRouter();
    const { codigo } = router.query;

    useEffect(() => {
        if (codigo) {
            axios.get(`/api/consults/${codigo}`)
                .then(response => setConsult(response.data))
                .catch(error => console.error(error));
        }
    }, [codigo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConsult({ ...consult, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/consults/${codigo}`, consult)
            .then(() => router.push(`/consults/${codigo}`))
            .catch(error => console.error(error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Edit Consultation</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Fecha:
                    <input type="text" name="fechaConsulta" value={consult.fechaConsulta} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-2">
                    Hora:
                    <input type="text" name="horaConsulta" value={consult.horaConsulta} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-2">
                    Médico Tratante:
                    <input type="text" name="medico_tratante" value={consult.medico_tratante} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-2">
                    Número de Clínica:
                    <input type="text" name="nro_clinica" value={consult.nro_clinica} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <label className="block mb-4">
                    RUT Paciente:
                    <input type="text" name="rut" value={consult.rut} onChange={handleInputChange} className="border p-2 rounded w-full" />
                </label>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            </form>
        </div>
    );
};

export default EditConsultPage;
