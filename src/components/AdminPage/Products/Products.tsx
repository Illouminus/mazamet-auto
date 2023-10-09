"use client"
import React from 'react';
import cls from './Products.module.css';
import classNames from 'classnames';
import {useAppDispatch} from "@/lib/useAppDispatch/useAppDispatch";
import { deleteProduct } from './asyncThunks/DeleteProduct/deleteProduct';
import {Product} from "./types/ProductType";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import { motion } from 'framer-motion';


interface ProductsProps {
    products: Product[]
}

export const Products = ({products}: ProductsProps) => {
    const dispatch = useAppDispatch()
    console.log(products)

    const deleteHandler = async(id: string) => {
        await dispatch(deleteProduct(id));
    }

    return (
        <div className={cls.flexContainer}>
            <div className={cls.mainDiv}>
                <div className={cls.innerDiv}>
                    <div className={cls.tableContainer}>
                        <table className={cls.table}>
                            <thead className={cls.tableHeader}>
                            <tr >
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Nom
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Prix
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Quantité
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Catégorie
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Model
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Ajouté le
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Modifier
                                </th>

                            </tr>
                            </thead>
                            <tbody className={cls.tableBody}>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGrayDark)}>{product.name}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.price}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.quantity}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.category.name}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.model.name}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.createdAt}</div>
                                    </td>
                                    <td className={cls.tableCellIcons}>
                                        <motion.div
                                            whileHover={{
                                                scale: 1.5,
                                                transition: { duration: 0.2 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => deleteHandler(product._id)}>
                                            <AiOutlineDelete />
                                        </motion.div>
                                        <motion.div
                                            whileHover={{
                                                scale: 1.5,
                                                transition: { duration: 0.2 },
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <AiOutlineEdit />
                                        </motion.div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const fetchCache = 'force-no-store';
