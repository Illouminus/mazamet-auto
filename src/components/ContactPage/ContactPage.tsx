"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Импорт иконок
import {Loader} from "@/components/Loader/Loader";

type FormData = {
    name: string;
    email: string;
    message: string;
};

export function ContactPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null);
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/contact`, data);
            if (response.status === 200) {
                setFormStatus('success');
                reset();
                setTimeout(() => {
                    router.push('/'); // Перенаправление на главную страницу
                }, 2000); // Задержка в 2 секунды
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            setFormStatus('error');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container mt-36 mx-auto px-4 py-8 relative"> {/* Добавлен класс relative */}
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-100 z-10">
                    <Loader />
                </div>
            )}


            {formStatus === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-4"
                >
                    <FaCheckCircle className="text-green-500 text-5xl" />
                    <p>Votre message a été envoyé avec succès!</p>
                </motion.div>
            )}

            {formStatus === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-4"
                >
                    <FaExclamationCircle className="text-red-500 text-5xl" />
                    <p>Une erreur s'est produite lors de l'envoi de votre message.</p>
                </motion.div>
            )}

            {!formStatus && ( // Форма отображается только если нет статуса
                <>
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-8 text-center"
                    >
                        Nous contacter
                    </motion.h1>

                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Nom"
                            {...register("name", { required: true })}
                            className="p-2 border rounded"
                        />
                        {errors.name && <span className="text-red-500">Ce champ est requis</span>}

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            className="p-2 border rounded"
                        />
                        {errors.email && <span className="text-red-500">Entrez un email valide</span>}

                        <textarea
                            placeholder="Message"
                            {...register("message", { required: true })}
                            rows={4}
                            className="p-2 border rounded"
                        />
                        {errors.message && <span className="text-red-500">Ce champ est requis</span>}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="self-end mt-4 p-2 bg-slate-800 text-white rounded"
                        >
                            Envoyer
                        </motion.button>
                    </motion.form>
                </>
            )}
        </div>
    );
}
