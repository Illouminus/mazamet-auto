import { configureStore } from '@reduxjs/toolkit'
import {StateSchema} from "@/providers/StoreProvider/StateSchema";
import {userReducer} from "@/slices/userSlice/userSlice";
import {loginReducer} from "@/slices/loginSlice/loginSlice";
import {productReducer} from "@/slices/productSlice/productSlice";



export function createReduxStore(initialState?: StateSchema) {

        return configureStore<StateSchema>({
            reducer: {
                user: userReducer,
                login: loginReducer,
                products: productReducer
            },
            devTools: true,
            preloadedState: initialState,
})
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
