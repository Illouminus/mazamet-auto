import {AsyncThunk, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {ErrorAutorisation} from "@/slices/loginSlice/types/loginSchema";
import {loginActions} from "@/slices/loginSlice/loginSlice";
import {USER_LOCALSTORAGE_KEY} from "@/lib/const/localstorage";



export interface User {
    username: string
    admin: boolean
    isAuthenticated: boolean
}

export const checkAuthStatus = createAsyncThunk<User, void, { rejectValue: ErrorAutorisation }>(
    'login/checkAuthStatus',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/api/users/login');

            if (!response.data) {
                throw new Error();
            }

            // Обновляем состояние в соответствии с ответом
            thunkAPI.dispatch(loginActions.setAuthData(response.data));

            return response.data;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.error || 'Unknown error',
                status: error.response?.status
            });
        }
    }
);
