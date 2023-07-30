import { configureStore } from '@reduxjs/toolkit'
import {StateSchema, ThunkExtraArg} from "@/providers/StoreProvider/StateSchema";
import {userReducer} from "@/slices/userSlice/userSlice";
import {$api} from "@/lib/api/api";
import {loginReducer} from "@/slices/loginSlice/loginSlice";



export function createReduxStore(initialState?: StateSchema) {

    const extraArg: ThunkExtraArg = {
        api: $api
    }
        return configureStore<StateSchema>({
            reducer: {
                user: userReducer,
                login: loginReducer
            },
            devTools: true,
            preloadedState: initialState,
            // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            //     thunk: {
            //         extraArgument: extraArg
            //     }
            // })
})
}

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
