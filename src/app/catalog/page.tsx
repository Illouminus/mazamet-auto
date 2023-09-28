import {CatalogHome, marquesList} from "@/components/CatalogPage/CatalogHome/CatalogHome";
import {Metadata} from "next";





export const metadata: Metadata = {
    title: 'PHENIX - CATALOG',
}

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/filter/brands`)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function CatalogPage () {
    const brands = await getData()
    return (
        <CatalogHome brands={brands}/>
    )
}
