// FindPage.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Map } from "./Map/Map";

export const FindPage = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-full px-4 py-8 bg-gray-100 gap-16">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col space-y-4 w-full md:w-1/3 p-6 mb-8 md:mb-0 bg-white shadow-lg rounded-md"
            >
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Nous trouver</h1>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Adresse :</h2>
                    <p className="text-gray-600">4 lieu-dit les Calmettes,</p>
                    <p className="text-gray-600">189 Route de Pomarede,</p>
                    <p className="text-gray-600">81660 Pont-de-Larn</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Horaires d&apos;ouverture :</h2>
                    <p className="text-gray-600">Du lundi au samedi : 8h - 18h</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-md"
            >
                <Map />
            </motion.div>
        </div>
    );
};
