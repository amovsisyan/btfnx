import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {default_ASKS, default_BIDS} from "./initialValues";
import {RootState} from "../../store";
import {ASKS, BIDS} from "../../constants/appConstants";

export interface OrderBookDataState {
    bids: any
    asks: any
}

const initialState: OrderBookDataState = {
    bids: default_BIDS,
    asks: default_ASKS,
}

export const orderBookDataSlice = createSlice({
    name: 'orderBookData',
    initialState,
    reducers: {
        addBidsAndAsks: (state, action: PayloadAction<any>) => {
            // @ts-ignore
            for (const value of action.payload) {
                const [, msg] = value

                const pp = {price: msg[0], cnt: msg[1], amount: msg[2]}
                const side = pp.amount >= 0 ? BIDS : ASKS;

                pp.amount = Math.abs(pp.amount)
                if (side === BIDS) {
                    state.bids[pp.price] = pp;
                } else {
                    state.asks[pp.price] = pp;
                }
            }
        }
    },
})

export const { addBidsAndAsks } = orderBookDataSlice.actions

// selectors
export const getBids = (state: RootState) => state.orderBookData.bids
export const getAsks = (state: RootState) => state.orderBookData.asks

export default orderBookDataSlice.reducer
