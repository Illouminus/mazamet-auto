import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Product, ProductSchema} from "@/slices/productSlice/types/ProductSchema";
import {deleteProduct} from "@/components/AdminPage/Products/asyncThunks/DeleteProduct/deleteProduct";
import {getProducts} from "@/components/AdminPage/Products/asyncThunks/GetProducts/asyncThunkGetProducts";



const initialState: ProductSchema = {
    isLoading: false,
    error: false,
    productList: [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.productList.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = true
                state.error = true
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                console.log('ACTION: ', action.payload);
                state.productList = state.productList.filter(item => item.id != action.payload)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = true
                state.error = true
            })

    }
})

// Action creators are generated for each case reducer function
export const { actions: productActions } = productSlice
export const {reducer: productReducer} = productSlice
