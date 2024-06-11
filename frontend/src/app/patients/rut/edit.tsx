"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditPatientPage: React.FC = () => {
    const [patient, setPatient] = useState({ nombre: '', direccion: '', telefono: '' });
    const router = useRouter();
    const { rut } = router.query;

    useEffect(() => {
        if (rut) {
            axios.get(`/api/patients/${rut}`)
                .then(response => setPatient(response.data))
                .catch(error => console.error(error));
        }
    }, [rut]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/patients/${rut}`, patient)
            .then(() => router.push(`/patients/${rut}`))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Editar Paciente</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="nombre" value={patient.nombre} onChange={handleInputChange} />
                </label>
                <label>
                    Dirección:
                    <input type="text" name="direccion" value={patient.direccion} onChange={handleInputChange} />
                </label>
                <label>
                    Teléfono:
                    <input type="text" name="telefono" value={patient.telefono} onChange={handleInputChange} />
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default EditPatientPage;
