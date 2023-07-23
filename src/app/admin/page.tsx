"use client"

import toast, { Toaster } from 'react-hot-toast';
export default  function ProfilePage() {

    const handler = () => {
        toast.success('HIII')
    }

    return (
        <div className="flex justify-center items-center h-full">
            <Toaster />
            Admin Page
            <button onClick={handler}>CLICK</button>
        </div>
    )
}
