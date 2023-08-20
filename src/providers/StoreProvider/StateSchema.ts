import {UserSchema} from "@/slices/userSlice/types/UserSchema";
import {AxiosInstance} from "axios";
import {LoginSchema} from "@/slices/loginSlice/types/loginSchema";
import {ProductSchema} from "@/slices/productSlice/types/ProductSchema";


export interface StateSchema {
    user: UserSchema
    login: LoginSchema
    products: ProductSchema
}



export interface ThunkExtraArg {
    api: AxiosInstance
}
