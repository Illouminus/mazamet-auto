"use client"
import React from 'react';
import Image from "next/image";
import cls from './Home.module.css'
import classNames from "classnames";
import {acme} from "@/lib/fonts/fonts";
import carImage from "../../../public/images/img/Car_filter.png"
import Link from "next/link";
import {CarCard} from "@/components/Home/CarCard/CarCard";
import { motion } from 'framer-motion';
export const HomeComponent = () => {

    return (
        <div className={cls.container}>
            <div className={classNames(cls.container_car, acme.className)}>
                <Image
                    src={carImage}
                    placeholder={"blur"}
                    priority
                    fill
                    style={{
                        objectFit:"cover",
                        objectPosition:"center"
                    }}
                    className={cls.car_image}
                    alt={'Image of car'}
                />
                <h1 className={cls.text}>MAZAMET - PIECES AUTO</h1>
                <h2>
                    Découvrez notre garage en ligne pour des pièces auto de
                    toutes marques, livrées rapidement et à des prix compétitifs.
                    Nous sommes à votre service pour tous vos besoins en pièces détachées.
                </h2>
            </div>

            <div className={cls.container_catalog_link}>
                <Link href={'/catalog'} className={cls.catalog_link}>
                    VOIR LE CATALOG
                </Link>
            </div>
            <div className={cls.container_car_parts}>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                    <CarCard image={'/images/car_parts/car_wheel.png'} title={'Des roues'} description={'Découvrez notre sélection de pneus de haute qualité et de jantes élégantes pour une conduite en toute sécurité et un style exceptionnel.'} />
                </motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
                    <CarCard image={'/images/car_parts/car_moteur.png'} title={'Des moteurs'} description={'Trouvez des moteurs puissants et des pièces de rechange de qualité pour optimiser les performances de votre véhicule.'} />
                </motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
                    <CarCard image={'/images/car_parts/car_frain.png'} title={'Des frains'} description={'Assurez-vous un freinage fiable avec nos freins et accessoires de haute performance, garantissant votre sécurité sur la route.'} />
                </motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
                    <CarCard image={'/images/car_parts/car_alternateur.png'} title={'Des alternateurs'} description={'Nos alternateurs et composants électriques de qualité supérieure garantissent un système électrique fiable pour votre véhicule.'} />
                </motion.div>
            </div>

            <div className={cls.container_car_full}>
                <div className={cls.container_car_full_center}>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <Image
                            src={'/images/car/bmw.png'}
                            height={200}
                            width={200}
                            style={{
                                objectFit:"contain",
                                objectPosition:"center"
                            }}
                            alt={'Image of car'}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <Image
                            src={'/images/car/bike.png'}
                            height={200}
                            width={200}
                            style={{
                                objectFit:"contain",
                                objectPosition:"center"
                            }}
                            alt={'Image of car'}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                    >
                        <Image
                            src={'/images/car/quad.png'}
                            height={200}
                            width={200}
                            style={{
                                objectFit:"cover",
                                objectPosition:"center"
                            }}
                            alt={'Image of car'}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

