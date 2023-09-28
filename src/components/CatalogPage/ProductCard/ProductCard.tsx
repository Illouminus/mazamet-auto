import React from 'react';
import { selectedProduct} from "@/slices/productSlice/types/ProductSchema";
import cls from './ProductCard.module.css'
import Image from "next/image";
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import {Loader} from "@/components/Loader/Loader";


interface productCardInterface {
    item?: selectedProduct
}
export const ProductCard = ({ item }: productCardInterface) => {
    const router = useRouter()
    const routeHandler = (id: string) => {
        router.push(`/catalog/${id}`, { scroll: false })
    }
    if (!item)
        return <Loader />
    return (
        <motion.div
            className={cls.container}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
        }}
            transition={{ duration: 0.2}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            onClick={() => routeHandler(item?._id ? item?._id : '')}
        >

            {item?.images && item.images[0] ?
                <Image
                    src={item?.images && item.images[0]}
                    alt={'Images de piece a vendre'}
                    className={cls.imageCard}
                    width={280}
                    height={300}
                    style={{objectFit: "contain"}}
                />
                :
                <Image
                    src={'/images/icons/error_image.png'}
                    alt={'Images de piece a vendre'}
                    className={cls.imageCardError}
                    width={280}
                    height={300}
                    style={{objectFit: "none"}}
                />
            }

                <div className={cls.info_card}>
                    <h2>{item?.name}</h2>
                    <div className={cls.prices}>
                        <p>€ {item?.price}</p>
                        <div>€{item?.price && item?.price + (item.price * 0.20)}</div>
                    </div>
                </div>
                <button className={cls.buy_button}>
                    <span>
                        <img
                            src={'/images/icons/buy.svg'}
                            className={cls.image_buy}
                            alt={'image of buy icon'}
                        />
                    </span>
                    <span>Acheter</span>
                </button>
        </motion.div>
    );
};

