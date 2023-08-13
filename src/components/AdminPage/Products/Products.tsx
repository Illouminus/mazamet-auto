import React, { useEffect, useState } from 'react';
import cls from './Products.module.css';
import classNames from 'classnames';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    category: string;
    model: string;
    createdAt: string;
}

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    console.log('PRODUCTS', products)

    useEffect(() => {
        fetch('/api/filter/products', { next: { revalidate: 0 }})
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [])

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

export const fetchCache = 'force-no-store';
