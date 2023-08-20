"use client"
import React, { useEffect } from 'react';
import cls from './Products.module.css';
import classNames from 'classnames';
import {useAppDispatch} from "@/lib/useAppDispatch/useAppDispatch";
import {getProducts} from "@/components/AdminPage/Products/asyncThunkGetProducts/asyncThunkGetProducts";
import {useSelector} from "react-redux";
import {getProductsList} from "@/components/AdminPage/Products/selectors/productSelector";

export const Products = () => {
    const dispatch = useAppDispatch()
    const products = useSelector(getProductsList)

    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getProducts())
        }
        fetchData().catch(console.error)
    }, [dispatch])


    return (
        <div className={cls.flexContainer}>
            <div className={cls.mainDiv}>
                <div className={cls.innerDiv}>
                    <div className={cls.tableContainer}>
                        <table className={cls.table}>
                            <thead className={cls.tableHeader}>
                            <tr>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Product Name
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Description
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Price
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Quantity
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Category
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Model
                                </th>
                                <th scope="col" className={classNames(cls.tableHeadCell, cls.textLeft, cls.smallFont, cls.textGray)}>
                                    Added On
                                </th>
                            </tr>
                            </thead>
                            <tbody className={cls.tableBody}>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGrayDark)}>{product.name}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.description}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.price}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.quantity}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.category}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.model}</div>
                                    </td>
                                    <td className={cls.tableCell}>
                                        <div className={classNames(cls.textSm, cls.textGray)}>{product.createdAt}</div>
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


