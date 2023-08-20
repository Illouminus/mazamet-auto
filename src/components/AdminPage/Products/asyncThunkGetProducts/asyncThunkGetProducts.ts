import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {Product} from "@/slices/productSlice/types/ProductSchema";
import {productActions} from "@/slices/productSlice/productSlice";


export const getProducts = createAsyncThunk<Product, void>(
    'products/getProductsList',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.get('/api/filter/products')

            if (!response.data) {
                throw new Error()
            }
            thunkAPI.dispatch(productActions.setProductsList(response.data))

            return response.data
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({
                error: true
            })
        }
    }
)
