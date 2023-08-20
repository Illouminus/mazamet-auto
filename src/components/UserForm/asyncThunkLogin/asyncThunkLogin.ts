import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {ErrorAutorisation} from "@/slices/loginSlice/types/loginSchema";
import {loginActions} from "@/slices/loginSlice/loginSlice";



export interface User {
    username: string
    admin: boolean,
    isAuthenticated: boolean
}

interface LoginByUsernameProps {
    username: string
    email?: string
    password: string
    path: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: ErrorAutorisation}>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
            try {
                const response = await axios.post(authData.path, authData)

                if (!response.data) {
                    throw new Error()
                }
                thunkAPI.dispatch(loginActions.setAuthData(response.data))

                return response.data
            } catch (error: any) {
                console.log(error)
                return thunkAPI.rejectWithValue({
                    error: error.response.data.error || 'Unknown error',
                    status: error.response.status
                })
            }
    }
)
