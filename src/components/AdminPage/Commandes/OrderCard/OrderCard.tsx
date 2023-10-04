"use client"
import React from 'react';
import {Order} from "../types/types";
import cls from './OrderCard.module.css'
import Image from "next/image";
interface OrderCardProps {
    order: Order
}

const statusColors = {
    pending: "yellow",
    completed: "green",
    cancelled: "red",
};

const statusTranslate = {
    pending: "En attente",
    completed: "Envoyé",
    cancelled: "Annulé",
};

export const OrderCard = ({order}: OrderCardProps) => {
    const backgroundColor = statusColors[order.status];
    const statusOrder = statusTranslate[order.status]

    return (
        <div
            className={cls.container}
            style={{
                border: `1px solid ${backgroundColor}`
            }}
        >
            <h2 className={cls.order_name}>{order.items.product.name}</h2>
            {order.items.product.images ?
                <Image
                    src={order.items.product.images[0]}
                    alt={'Image of product'}
                    width={200}
                    height={200}
                />
                :
                ""
            }
            <div className={cls.date}>
                <p>Date de commande:</p>
                <p>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className={cls.order_quant}>
                <p>Quantité commandé</p>
                <p>{order.items.quantity}</p>
            </div>
            <div className={cls.order_quant}>
                <p>Nom de client</p>
                <p>{order.customer.name}</p>
            </div>
            <div className={cls.adress}>
                <p style={{
                    borderBottom: '1px solid gray',
                    marginBottom: '5px'
                }}>Adresse de livraison</p>
                <p>{order.customer.address}</p>
            </div>
            <div className={cls.order_quant}>
                <p>Prix final</p>
                <p>{order.totalPrice / 100} euros</p>
            </div>
            <div className={cls.order_quant}>
                <p>Status</p>
                <p>{statusOrder}</p>
            </div>
        </div>
    );
};

