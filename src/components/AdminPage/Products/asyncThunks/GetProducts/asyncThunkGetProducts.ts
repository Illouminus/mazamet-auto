import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {Product} from "@/slices/productSlice/types/ProductSchema";



export const getProducts = createAsyncThunk<Product[], void>(
    'products/getProductsList',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post('/api/filter/products')

            if (response.data) {
                return response.data
            }
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({
                error: true
            })
        }
    }
)
