"use client"
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


export default  function UserProfile({params}: any) {
    const router = useRouter()

    return (
        <div className="flex justify-center items-center h-screen bg-red-300">
            <h1 className="accent-red-400">
                Profile page {params.id}
            </h1>

        </div>
    )
}
