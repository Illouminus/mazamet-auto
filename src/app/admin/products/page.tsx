import cls from './styles.module.css'
import {Sidebar} from "@/components/AdminPage/Sidebar/Sidebar";
import {Products} from "@/components/AdminPage/Products/Products";


export default async function Page () {

    return (
       <div className={cls.container}>
           <Sidebar />
           <Products />
       </div>
    )
}


export const fetchCache = 'force-no-store';
