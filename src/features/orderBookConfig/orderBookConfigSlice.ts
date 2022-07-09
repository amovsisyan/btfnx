import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {default_PRECISION, default_THROTTLE} from "./initialValues";
import {RootState} from "../../store";

export interface OrderBookConfigState {
    throttle: number
    precision: string
}

const initialState: OrderBookConfigState = {
    throttle: default_THROTTLE,
    precision: default_PRECISION,
}

export const orderBookConfigSlice = createSlice({
    name: 'orderBookConfig',
    initialState,
    reducers: {
        setThrottle: (state, action: PayloadAction<number>) => {
            state.throttle = action.payload
        },
        setPrecision: (state, action: PayloadAction<string>) => {
            state.precision = action.payload
        },
    },
})

export const { setThrottle, setPrecision } = orderBookConfigSlice.actions

// selectors
export const getThrottle = (state: RootState) => state.orderBookConfig.throttle
export const getPrecision = (state: RootState) => state.orderBookConfig.precision

export default orderBookConfigSlice.reducer
