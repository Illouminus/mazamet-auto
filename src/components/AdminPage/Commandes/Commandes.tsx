"use client"
import React from 'react';
import cls from './Commandes.module.css'
import {Order} from "./types/types";
import {OrderCard} from "./OrderCard/OrderCard";

interface CommandesProps {
    orders: Order[]
}

export const CommandesComponent = ({orders}: CommandesProps) => {
    return (
        <div className={cls.container}>
            {orders.map((order) => (
                <OrderCard order={order} key={order._id}/>
            ))}
        </div>
    );
};

