import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {loginByUsername} from "@/components/UserForm/asyncThunkLogin/asyncThunkLogin";
import {Product, ProductSchema} from "@/slices/productSlice/types/ProductSchema";



const initialState: ProductSchema = {
    isLoading: false,
    error: false,
    productList: [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsList: (state, action: PayloadAction<Product[]>) => {
            state.productList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = true
                state.error = false
            })
    }
})

// Action creators are generated for each case reducer function
export const { actions: productActions } = productSlice
export const {reducer: productReducer} = productSlice
