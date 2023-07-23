"use client"
import React, {useState, createContext, Dispatch, SetStateAction, ReactNode, useEffect} from "react";

import { useCookies } from 'react-cookie';
import axios from "axios";
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

// Создаем контекст с дефолтными значениями
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/api/users/login')
                setIsAuthenticated(response.data.isAuthenticated)
            } catch (error) {
                console.log(error)
            }
        }

        checkAuthStatus()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
