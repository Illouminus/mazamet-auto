import {CatalogPageIdHome} from "@/components/CatalogPageID/CatalogPageIDHome/CatalogPageIDHome";
import {Metadata} from "next";

interface pageProps {
    params: {id: string}
}

export async function generateMetadata(
    { params }: pageProps,

): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const product = await getData(params.id)


    return {
        title: product.name,
    }
}

async function getData(id: string) {
    const res = await fetch(`${process.env.BASE_URL}/api/products?id=${id}`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function CatalogPageId ({params}: pageProps)  {
    const product = await getData(params.id)

    return (
        <CatalogPageIdHome product={product}/>
    )
}



