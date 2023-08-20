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
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.productList.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const { actions: productActions } = productSlice
export const {reducer: productReducer} = productSlice
