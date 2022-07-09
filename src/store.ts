import { configureStore } from '@reduxjs/toolkit'
import orderBookConfigReducer from './features/orderBookConfig/orderBookConfigSlice'
import orderBookDataReducer from './features/orderBookData/orderBookDataSlice'

export const store = configureStore({
    reducer: {
        orderBookConfig: orderBookConfigReducer,
        orderBookData: orderBookDataReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
