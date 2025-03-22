import { configureStore } from '@reduxjs/toolkit'
import customerReducer  from "./screen/module/customer/reducer"

export const store = configureStore({
    reducer: {
        // account: accountReducer,
        customer: customerReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch