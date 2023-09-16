import React from 'react';
import { motion } from "framer-motion"
import {marquesList} from "@/components/CatalogPage/CatalogHome/CatalogHome";
import cls from './ListCarComponent.module.css'
import {Loader} from "@/components/Loader/Loader";
interface listCarProps {
    items?: marquesList[] ;
    setItem: (marque: string) => void;
}


export const ListCarComponent = (props: listCarProps) => {
    const {setItem, items} = props;

    const listVariants = {
        visible: (i: any) => ({
            opacity: 1,
            transition: {
                delay: i * 0.3
            }
        }),
        hidden: {
            opacity: 0,
        }
    }
    if (!items)
        return <Loader />
    return (
        <div className={cls.container}>
            {items && items.map((el, i) => (
                <motion.div
                    key={i}
                    variants={listVariants}
                    className={cls.card}
                    initial={'hidden'}
                    animate={'visible'}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.8}}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}
                    custom={i}
                    onClick={() => setItem(el.id)}
                >
                    {el.name}
                </motion.div>
            ))}
        </div>
    );
};
