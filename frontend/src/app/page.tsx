"use client";

import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Clinic Management System</h1>
            <div className="flex space-x-4">
                <Link href="/patients">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">View Patients</span>
                </Link>
                <Link href="/consults">
                    <span className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">View Consultations</span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
