"use client"
import React from 'react';
import {Product} from "@/slices/productSlice/types/ProductSchema";
import cls from './CatalogPageIDHome.module.css'
import {Loader} from "@/components/Loader/Loader";
import {CatalogPageIdCarousel} from "../CatalogPageIDCarousel/CatalogPageIDCarousel";
import {CatalogUserActions} from "@/components/CatalogPageID/CatalogUserActions/CatalogUserActions";

interface CatalogPageIdHomeProps {
    product: Product | undefined
}

export const CatalogPageIdHome = ({product}: CatalogPageIdHomeProps) => {
    return (
        <div className={cls.container}>
            {product ?
                <div className={cls.wrapper}>
                    <div className={cls.info_card}>
                        <CatalogPageIdCarousel images={product.images}/>
                    </div>
                    <div className={cls.user_actions}>
                        <CatalogUserActions product={product}/>
                    </div>
                </div>
             :
                <Loader />
            }
        </div>
    );
};

