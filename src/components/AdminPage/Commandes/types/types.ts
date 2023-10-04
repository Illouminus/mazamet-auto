import {Product} from "@/slices/productSlice/types/ProductSchema";

type Customer = {
    name: string;
    email: string;
    address: string;
};

type Item = {
    product: Product;
    quantity: number;
};

export type Order = {
    customer: Customer;
    items: Item;
    _id: string;
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled'; // добавьте другие возможные статусы, если они есть
    createdAt: string; // или Date, если вы преобразуете строку в дату
    updatedAt: string; // или Date, если вы преобразуете строку в дату
    __v: number;
};
