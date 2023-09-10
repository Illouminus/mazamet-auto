'use client'
import {FC, useEffect, useState} from "react";
import {CatalogPageIdHome} from "@/components/CatalogPageID/CatalogPageIDHome/CatalogPageIDHome";
import {Product} from "@/slices/productSlice/types/ProductSchema";
import {useSelector} from "react-redux";
import {getProductsList} from "@/components/AdminPage/Products/selectors/productSelector";

interface pageProps {
    params: {id: string}
}

const Page = ({params}: pageProps) => {
    const [product, setProduct] = useState<Product>()
    const products = useSelector(getProductsList);

    useEffect(() => {
            const foundProduct = products.find((el) => el.id === params.id);
            setProduct(foundProduct);
    }, [products, params.id]);

    return (
        <CatalogPageIdHome  product={product}/>
    )
}


export default Page;
