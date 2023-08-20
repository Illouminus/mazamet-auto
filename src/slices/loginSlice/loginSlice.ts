import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {LoginSchema} from "@/slices/loginSlice/types/loginSchema";
import {loginByUsername, User} from "@/components/UserForm/asyncThunkLogin/asyncThunkLogin";
import {checkAuthStatus} from "@/lib/checkAuthStatus/checkAuthStatus";



const initialState: LoginSchema = {
    isLoading: false,
    isAuthenticated: false,
    username: '',
    admin: false
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.username = action.payload.username
            state.admin = action.payload.admin
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state, action) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = true
                state.error = action.payload
            })
            .addCase(checkAuthStatus.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.isAuthenticated;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.payload;
            })
    }
})

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlice
export const {reducer: loginReducer} = loginSlice
