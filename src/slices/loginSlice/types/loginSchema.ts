
export interface ErrorAutorisation {
    error: string
    status: number
}

export interface LoginSchema {
    isLoading: boolean
    error?: ErrorAutorisation
    isAuthenticated: boolean,
    username: string,
    admin: boolean
}
