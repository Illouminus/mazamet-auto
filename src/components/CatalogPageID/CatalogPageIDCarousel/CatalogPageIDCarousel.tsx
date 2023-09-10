import React, {useState} from 'react';
import Image from "next/image";
import {Loader} from "@/components/Loader/Loader";
import cls from './CatalogPageIDCarousel.module.css'
import classNames from "classnames";
import { motion } from "framer-motion"
interface catalogPageIdCarouselProps {
    images: string[]
}
export const CatalogPageIdCarousel = (props: catalogPageIdCarouselProps) => {
    const [index, setIndex] = useState<number>(0)
    const nextImage = (i?: number) => {
        i !== undefined ? setIndex(i)
            :
        index != props.images.length - 1 ? setIndex((prev) => prev += 1) : setIndex(0)
    }
    return (
        <>
        {props.images ?
                <div className={cls.container}>
                <motion.div
                    className={cls.main_photo}
                >
                        <Image
                            src={props.images[index]}
                            alt={'main photo'}
                            className={cls.main_image}
                            fill
                        />
                </motion.div>
                <div className={cls.seconds_photos}>
                    {props.images.map((image, i) => (
                        <Image
                            src={image}
                            alt={'image'}
                            width={70}
                            height={70}
                            key={i}
                            className={classNames(i == index ? cls.miniature_selected : cls.miniature)}
                            onClick={() => nextImage(i)}
                        />
                    ))}
                </div>
                </div>
        :
        <Loader />
        }
        </>
    );
};
