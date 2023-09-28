"use client"
import React, { useEffect } from 'react';
import cls from './Products.module.css';
import classNames from 'classnames';
import {useAppDispatch} from "@/lib/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getProductsList} from "@/components/AdminPage/Products/selectors/productSelector";
import Image from "next/image";
import { getProducts } from './asyncThunks/GetProducts/asyncThunkGetProducts';
import { deleteProduct } from './asyncThunks/DeleteProduct/deleteProduct';

export const Products = () => {
    const dispatch = useAppDispatch()
    const products = useSelector(getProductsList)

    // useEffect(() => {
    //     const fetchData = async() => {
    //         await dispatch(getProducts())
    //     }
    //     fetchData().catch(console.error)
    // }, [dispatch])

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
                                    Description
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
                                    <td className={cls.tableCellIcons}>
                                        <div onClick={() => deleteHandler(product._id)}>
                                            <Image
                                                src={'/images/icons/delete.svg'}
                                                alt={'delete icon'}
                                                width={20}
                                                height={20}
                                                className={cls.tableIconItem}
                                            />
                                        </div>
                                        <div>
                                            <Image
                                                src={'/images/icons/edit.svg'}
                                                alt={'edit icon'}
                                                width={20}
                                                height={20}
                                                className={cls.tableIconItem}
                                            />
                                        </div>
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
