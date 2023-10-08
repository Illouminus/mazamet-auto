"use client"
import React, {useCallback, useState} from 'react';
import cls from './CatalogHome.module.css'
import {ListCarComponent} from "@/components/CatalogPage/ListCarComponent/ListCarComponent";
import axios from "axios";
import { selectedProduct} from "@/slices/productSlice/types/ProductSchema";
import {ProductCard} from "@/components/CatalogPage/ProductCard/ProductCard";
import {FilterComponent} from "@/components/CatalogPage/FilterComponent/FilterComponent";
import {ComponentInfoSearch} from "@/components/CatalogPage/ComponentInfoSearch/ComponentInfoSearch";
import {Loader} from "@/components/Loader/Loader";


export interface marquesList {
    id: string,
    name: string
}

// @ts-ignore
export const CatalogHome = ({brands}) => {

    const [step, setStep] = useState<string>('step1');
    const [models, setModel] = useState<marquesList[]>();
    const [categories, setCategories] = useState<marquesList[]>();
    const [selectedProducts, setSelectedProducts] = useState<selectedProduct[]>([]);
    const [finalInfo, setFinalInfo] = useState<string[]>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    console.log(selectedProducts)

    const filterBy = (exp: string) => {
        let newProducts = [...selectedProducts]; // Создаем копию массива

        switch (exp) {
            case 'Trier par date':
                // Предположим, у вас есть поле `createdAt` в каждом продукте
                newProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'Trier par popularité':
                // Для примера просто перемешаем массив
                newProducts = newProducts.sort(() => Math.random() - 0.5);
                break;
            default:
                // Если "default", то оставляем массив без изменений
                break;
        }

        setSelectedProducts(newProducts);
    }

    const selectMarque = useCallback(async (id: string) => {
        setIsLoading(true)
        const response = await axios.get(`/api/filter/models?brand=${id}`)
        setModel(response.data);
        setIsLoading(false)
        setStep('step2');
    }, [])


    const selectModel = useCallback(async (id: string) => {
        setIsLoading(true)
        const response = await axios.get(`/api/filter/categories?model=${id}`)
        setCategories(response.data);
        setIsLoading(false)
        setStep('step3');
    }, [])

    const selectCategory = useCallback(async (id: string) => {
        setIsLoading(true)
        const response = await axios.get(`/api/filter/category?id=${id}`)
        setSelectedProducts(response.data.item);
        setFinalInfo([response.data.brand.name, response.data.model.name,  response.data.category, response.data.item.length])
        setIsLoading(false)
        setStep('step4');
    }, [])

    const renderLoader = (stepIn: string) => {
        if (stepIn === step)
            return <Loader />
    }


    return (
        <>
            <div className={cls.container}>
                {(step == 'step1' && !isLoading) ?
                        <ListCarComponent items={brands} setItem={selectMarque} />
                    :
                    renderLoader('step1')

                }
                {(step == 'step2' && !isLoading) ?
                        <ListCarComponent items={models} setItem={selectModel} />
                    :
                    renderLoader('step2')
                }
                {(step == 'step3' && !isLoading) ?
                        <ListCarComponent items={categories} setItem={selectCategory} />
                    :
                    renderLoader('step3')
                }
                {step == 'step4' &&
                    <>
                        <div className={cls.filter_component}>
                            <FilterComponent  />
                        </div>

                        <div className={cls.container_info}>
                            <ComponentInfoSearch infos={finalInfo} filter={filterBy}/>
                            <div className={cls.cards_container}>
                                {selectedProducts ?
                                    selectedProducts?.map(el => (
                                        <ProductCard item={el} key={el._id}/>
                                    ))
                                    :
                                    <Loader />
                                }
                            </div>
                        </div>

                    </>
                }
            </div>
        </>


    );
};

