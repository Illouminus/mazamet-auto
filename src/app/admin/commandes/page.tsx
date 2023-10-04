import {Sidebar} from "@/components/AdminPage/Sidebar/Sidebar";
import {Metadata} from "next";
import {CommandesComponent} from "@/components/AdminPage/Commandes/Commandes";
import cls from './styles.module.css'

export const metadata: Metadata = {
    title: 'COMMANDES',
}

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/orders/getAllOrders`, {
        next: { revalidate: 3600}
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}



export default async  function Commandes () {
   const orders = await getData()

    return (
      <div className={cls.container}>
          <Sidebar />
          <CommandesComponent orders={orders}/>
      </div>
    )
}
