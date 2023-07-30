import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {UserSchema} from "@/slices/userSlice/types/UserSchema";



const initialState: UserSchema = {
    value: 0,
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice
export const {reducer: userReducer} = userSlice
