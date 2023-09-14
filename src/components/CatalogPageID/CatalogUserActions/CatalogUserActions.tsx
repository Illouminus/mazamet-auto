import {Product} from "@/slices/productSlice/types/ProductSchema";
import cls from './CatalogUserActions.module.css'
import React, {useState} from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface CatalogUserActionsProps {
    product: Product
}

export const CatalogUserActions = ({product}: CatalogUserActionsProps) => {
    const [amount, setAmount] = useState<number>(0)
    const {name, price, model, brand, quantity, description} = product;

    const getAmountPlus = () => {
        if (amount < quantity)
            setAmount((prev) => prev += 1)
    }

    const getAmountMinus = () => {
        if (amount != 0)
            setAmount((prev) => prev -= 1)
    }

    const buyHandler = async (id: string) => {
        const {data} = await axios.post('/api/payment', {id, amount})
        console.log(data)
        window.location.assign(data)
    }
    return (
        <div className={cls.container}>
           <h1 className={cls.title}>{name}</h1>
            <div className={cls.pricices}>
                <h2 className={cls.price}>Є {price}</h2>
                <div>€{price + (price * 0.20)}</div>
            </div>
            <hr />
            <div className={cls.car_details}>
                <div>{brand.name} / {model}</div>
                <hr/>
                <div>{description}</div>
            </div>
            <hr />
            <div className={cls.buy_section}>
                <div className={cls.select}>
                    <span onClick={getAmountMinus}>-</span>
                    <span>{amount}</span>
                    <span onClick={getAmountPlus}>+</span>
                </div>
                <motion.button
                    className={cls.buy_button}
                    whileHover={{scaleY: 1.1}}
                    whileTap={{scale: 0.8}}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}
                    onClick={() => buyHandler(product.id)}
                >
                    ACHETER
                </motion.button>
            </div>
        </div>
    );
}

