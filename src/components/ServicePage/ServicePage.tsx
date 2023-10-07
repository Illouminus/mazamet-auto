"use client"

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaWrench, FaShoppingCart, FaRecycle, FaHandHoldingUsd, FaTools } from 'react-icons/fa';

const services = [
    {
        icon: <FaCar />,
        title: "Achat de votre auto",
        description: "Nous achetons votre voiture, quelle que soit sa condition."
    },
    {
        icon: <FaRecycle />,
        title: "Démontage",
        description: "Service professionnel de démontage de véhicules."
    },
    {
        icon: <FaWrench />,
        title: "Réparation",
        description: "Réparation de haute qualité pour votre véhicule."
    },
    {
        icon: <FaShoppingCart />,
        title: "Vente de pièces auto",
        description: "Large gamme de pièces auto pour tous les modèles."
    },
    {
        icon: <FaHandHoldingUsd />,
        title: "Estimation gratuite",
        description: "Obtenez une estimation gratuite pour votre véhicule ou pour les réparations."
    },
    {
        icon: <FaTools />,
        title: "Service de maintenance",
        description: "Maintenance régulière pour assurer la longévité de votre véhicule."
    }
];

export function ServicesPage() {
    return (
        <Fragment>
            <div className="container mx-auto flex flex-col px-4 py-8 mt-36">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-8 text-center"
                >
                    Nos Services
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 border rounded shadow-md"
                        >
                            <div className="flex items-center justify-center mb-4 text-4xl">
                                {service.icon}
                            </div>
                            <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
                            <p>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}
