import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {default_THROTTLE} from "./initialValues";
import {RootState} from "../../store";

export interface OrderBookConfigState {
    throttle: number
}

const initialState: OrderBookConfigState = {
    throttle: default_THROTTLE,
}

export const orderBookConfigSlice = createSlice({
    name: 'orderBookConfig',
    initialState,
    reducers: {
        setThrottle: (state, action: PayloadAction<number>) => {
            state.throttle = action.payload
        },
    },
})

export const { setThrottle } = orderBookConfigSlice.actions

// selectors
export const getThrottle = (state: RootState) => state.orderBookConfig.throttle

export default orderBookConfigSlice.reducer
