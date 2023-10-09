import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { selectedProduct } from "@/slices/productSlice/types/ProductSchema";
import cls from './ProductCard.module.css';
import { Loader } from "@/components/Loader/Loader";

interface ProductCardProps {
    item?: selectedProduct;
}

const ProductImage: React.FC<{ src: string | undefined }> = ({ src }) => {
    const defaultImage = '/images/icons/error_image.png';
    const imageSrc = src || defaultImage;
    const isDefault = imageSrc === defaultImage;

    return (
        <Image
            src={imageSrc}
            alt={'Images de piece a vendre'}
            className={isDefault ? cls.imageCardError : cls.imageCard}
            width={280}
            height={300}
            style={{ objectFit: isDefault ? "none" : "contain" }}
        />
    );
};

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const router = useRouter();

    const routeHandler = (id: string) => {
        router.push(`/catalog/${id}`, { scroll: false });
    };

    if (!item) return <Loader />;

    return (
        <motion.div
            className={cls.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => routeHandler(item._id || '')}
        >
            <ProductImage src={item.images?.[0]} />

            <motion.div className={cls.info_card} whileHover={{ y: -5 }}>
                <h2>{item.name}</h2>
                <div className={cls.prices}>
                    <p>€ {item.price}</p>
                    <div>€{item.price && (item.price + (item.price * 0.20))}</div>
                </div>
            </motion.div>

            <motion.button className={cls.buy_button} whileHover={{ y: -5 }}>
                <span>
                    <img
                        src={'/images/icons/buy.svg'}
                        className={cls.image_buy}
                        alt={'image of buy icon'}
                    />
                </span>
                <span>Acheter</span>
            </motion.button>
        </motion.div>
    );
};
