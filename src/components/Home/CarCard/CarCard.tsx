"use client"
import React, {useState} from 'react';
import cls from "./CarCard.module.css";
import { motion } from 'framer-motion';
import Link from "next/link";

interface CarCardProps {
    image: string,
    title: string,
    description: string
}

export const CarCard = (props: CarCardProps) => {
    const [isHover, setIsHover] = useState<boolean>(false)
    const {
        image,
        description,
        title
    } = props;

    return (
        <motion.div
            className={cls.card}
            whileHover={{
                scale: 1.1,
            }}
        >
            <div className={cls.overlay}>
                <div className={cls.hoverContent}>
                    <Link href={"/catalog"} className={cls.button}>Voir le catalog</Link>
                </div>
            </div>
            <img
                src={image}
                className={cls.image_car_part}
                alt={'Image of car'}
            />
            <h3 className={cls.title}>{title}</h3>
            <p className={cls.description}>{description}</p>
        </motion.div>
    );
};
