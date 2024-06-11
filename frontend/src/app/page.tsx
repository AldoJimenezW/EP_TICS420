// src/app/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Bienvenido a la Clínica</h1>
            <Link href="/patients">
                <button>Ver Pacientes</button>
            </Link>
            <Link href="/consults">
                <button>Ver Consultas</button>
            </Link>
        </div>
    );
};

export default HomePage;
