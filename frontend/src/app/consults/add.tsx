"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddConsultPage: React.FC = () => {
    const [consult, setConsult] = useState({ fechaConsulta: '', horaConsulta: '', medico_tratante: '', nro_clinica: 0, rut: '' });
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConsult({ ...consult, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/consults', consult)
            .then(() => router.push('/consults'))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Añadir Consulta</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha:
                    <input type="text" name="fechaConsulta" value={consult.fechaConsulta} onChange={handleInputChange} />
                </label>
                <label>
                    Hora:
                    <input type="text" name="horaConsulta" value={consult.horaConsulta} onChange={handleInputChange} />
                </label>
                <label>
                    Médico Tratante:
                    <input type="text" name="medico_tratante" value={consult.medico_tratante} onChange={handleInputChange} />
                </label>
                <label>
                    Número de Clínica:
                    <input type="text" name="nro_clinica" value={consult.nro_clinica} onChange={handleInputChange} />
                </label>
                <label>
                    RUT Paciente:
                    <input type="text" name="rut" value={consult.rut} onChange={handleInputChange} />
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default AddConsultPage;

