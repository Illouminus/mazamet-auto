// state.js

import {createContext, ReactNode, useContext, useState} from "react";

export const AppStateContext = createContext({});

interface appProviderProps {
    children: ReactNode
}


export function AppProvider({ children }: appProviderProps) {
    const value = useState({});
    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error("useAppState must be used within the AppProvider");
    }
    return context;
}
