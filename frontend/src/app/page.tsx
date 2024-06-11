// src/app/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
    const router = useRouter();

    const handleSelection = (role: string) => {
        if (role === 'patient') {
            router.push('/patient');
        } else if (role === 'consult') {
            router.push('/consult');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">¿Cómo quieres ver la página?</h1>
            <div className="space-x-4">
                <button
                    onClick={() => handleSelection('patient')}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Paciente
                </button>
                <button
                    onClick={() => handleSelection('consult')}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Consulta
                </button>
            </div>
        </div>
    );
};

export default HomePage;
