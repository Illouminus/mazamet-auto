import React, {useCallback, useEffect, useState} from 'react';
import cls from './CatalogHome.module.css'
import {useSelector} from "react-redux";
import {getProductsList} from "@/components/AdminPage/Products/selectors/productSelector";
import {ListCarComponent} from "@/components/CatalogPage/ListCarComponent/ListCarComponent";
import axios from "axios";
import { selectedProduct} from "@/slices/productSlice/types/ProductSchema";
import {ProductCard} from "@/components/CatalogPage/ProductCard/ProductCard";


export interface marquesList {
    id: string,
    name: string
}

export const CatalogHome = () => {

    const [step, setStep] = useState<string>('step1');
    const [brands, setBrands] = useState<marquesList[]>();
    const [models, setModel] = useState<marquesList[]>();
    const [categories, setCategories] = useState<marquesList[]>();
    const [selectedProducts, setSelectedProducts] = useState<selectedProduct[]>();
    const products = useSelector(getProductsList);

    useEffect(() => {
        async function getBrand() {
            const response = await axios.get('/api/filter/brands')
            setBrands(response.data)
        }
        getBrand();
    }, []);


    const selectMarque = useCallback(async (id: string) => {
        const response = await axios.get(`/api/filter/models?brand=${id}`)
        setModel(response.data);
        setStep('step2');
    }, [])

    const selectModel = useCallback(async (id: string) => {
        const response = await axios.get(`/api/filter/categories?model=${id}`)
        setCategories(response.data);
        setStep('step3');
    }, [])

    const selectCategory = useCallback(async (id: string) => {
        const response = await axios.get(`/api/filter/category?id=${id}`)
        setSelectedProducts(response.data);
        setStep('step4');
    }, [])

    return (
        <>
            <div className={cls.container}>
                {step == 'step1' &&
                    <>
                        {/*<div>Veuillez choisir votre marque automobile.</div>*/}
                        <ListCarComponent items={brands} setItem={selectMarque} />
                    </>
                }
                {step == 'step2' &&
                    <>
                        {/*<div>Veuillez choisir votre model automobile.</div>*/}
                        <ListCarComponent items={models} setItem={selectModel} />
                    </>
                }
                {step == 'step3' &&
                    <>
                        {/*<div>Veuillez choisir la catégorie.</div>*/}
                        <ListCarComponent items={categories} setItem={selectCategory} />
                    </>
                }
                {step == 'step4' &&
                    <div className={cls.cards_container}>
                        {selectedProducts && selectedProducts?.map(el => (
                            <ProductCard item={el} key={el._id}/>
                        ))}
                    </div>
                }
            </div>
        </>


    );
};

