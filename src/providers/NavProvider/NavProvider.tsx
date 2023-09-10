"use client"
import React, {ReactNode, useContext, useEffect} from 'react';
import '../../app/globals.css'
import {Navbar} from "@/components/Navbar/Navbar";
import {Footer} from "@/components/Footer/Footer";
import {AuthContext} from "@/providers/AuthProvider/AuthProvider";
import {getProducts} from "@/components/AdminPage/Products/asyncThunks/GetProducts/asyncThunkGetProducts";
import {useAppDispatch} from "@/lib/useAppDispatch/useAppDispatch";


type navProps = {
    children: ReactNode
}
export const NavProvider = ({children}: navProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getProducts())
        }
        fetchData().catch(console.error)
    }, [dispatch])

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    return (
        <div className="divRoot">
            <Navbar />
            {children}
            {isAuthenticated ? '' : <Footer />}

        </div>
    );
};
