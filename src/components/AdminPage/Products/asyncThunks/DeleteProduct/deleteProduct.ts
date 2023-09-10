import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {Product} from "@/slices/productSlice/types/ProductSchema";
import {productActions} from "@/slices/productSlice/productSlice";


export const deleteProduct = createAsyncThunk<string, string>(
    'products/deleteProduct',
    async (idProduct: string, thunkAPI) => {
        try {
            const response = await axios.delete(`/api/products?id=${idProduct}`)

            if (response.status == 200)
            {
                console.log('ID', response.data._id)
                return response.data._id
            }

        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({
                error: true
            })
        }
    }
)
