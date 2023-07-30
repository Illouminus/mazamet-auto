"use client"
import React, {ReactNode, useContext} from 'react';
import '../../app/globals.css'
import {Navbar} from "@/components/Navbar/Navbar";
import {Footer} from "@/components/Footer/Footer";
import {AuthContext} from "@/providers/AuthProvider/AuthProvider";


type navProps = {
    children: ReactNode
}
export const NavProvider = ({children}: navProps) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)
    return (
        <div className="divRoot">
            <Navbar />
            {children}
            {isAuthenticated ? '' : <Footer />}

        </div>
    );
};
