import cls from './styles.module.css'
import {Sidebar} from "@/components/AdminPage/Sidebar/Sidebar";
import {Products} from "@/components/AdminPage/Products/Products";
import {next} from "sucrase/dist/types/parser/tokenizer";


async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/products/getAllProducts`, {
        next: {revalidate: 3600}
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json()
}

export default async function Page () {
    const products = await getData()
    return (
       <div className={cls.container}>
           <Sidebar />
           <Products products={products}/>
       </div>
    )
}


export const fetchCache = 'force-no-store';
