"use client"

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaHistory, FaMedal, FaUsers, FaPhone } from 'react-icons/fa';

export function APropos() {
    return (
        <Fragment>
            <motion.div
                className="container flex flex-col mx-auto px-4 py-8 mt-36"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-4xl font-bold mb-8 text-center"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    A Propos de MAZAMET PIECES AUTO
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: <FaCar />,
                            title: "Qui sommes-nous?",
                            description: "MAZAMET PIECES AUTO est votre partenaire de confiance pour toutes vos pièces auto. Fondée en 2002, nous nous sommes engagés à fournir des pièces de qualité à des prix abordables."
                        },
                        {
                            icon: <FaHistory />,
                            title: "Notre histoire",
                            description: "Depuis notre création, nous avons servi des milliers de clients satisfaits et avons continué à élargir notre gamme de produits pour répondre à tous vos besoins en matière de pièces auto."
                        },
                        {
                            icon: <FaMedal />,
                            title: "Pourquoi nous choisir?",
                            description: <ul className="list-disc pl-5">
                                <li>Qualité garantie</li>
                                <li>Prix compétitifs</li>
                                <li>Livraison rapide</li>
                                <li>Service clientèle exceptionnel</li>
                            </ul>
                        },
                        {
                            icon: <FaUsers />,
                            title: "Notre équipe",
                            description: "Notre équipe est composée de professionnels passionnés par l'automobile et dédiés à vous fournir le meilleur service possible."
                        }
                    ].map((section, index) => (
                        <motion.div
                            key={index}
                            className="p-6 border rounded shadow-md"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center justify-center mb-4 text-4xl">
                                {section.icon}
                            </div>
                            <h2 className="text-3xl font-semibold mb-4">{section.title}</h2>
                            <div>{section.description}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.section
                    className="mt-8 p-6 border rounded shadow-md"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="flex items-center justify-center mb-4 text-4xl">
                        <FaPhone />
                    </div>
                    <h2 className="text-3xl font-semibold mb-4">Contactez-nous</h2>
                    <p>
                        Si vous avez des questions ou souhaitez en savoir plus sur nos produits, n&apos;hésitez pas à nous contacter via notre forme de contact.
                    </p>
                </motion.section>
            </motion.div>
        </Fragment>
    );
}

