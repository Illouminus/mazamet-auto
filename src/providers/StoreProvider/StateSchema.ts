import {UserSchema} from "@/slices/userSlice/types/UserSchema";
import {AxiosInstance} from "axios";
import {LoginSchema} from "@/slices/loginSlice/types/loginSchema";


export interface StateSchema {
    user: UserSchema
    login: LoginSchema
}



export interface ThunkExtraArg {
    api: AxiosInstance
}
