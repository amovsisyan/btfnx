import React from "react";
import {OrderBookTableComponent} from "../../components/OrderBookTableComponent/OrderBookTableComponent";
import {API_URL, ASKS, BIDS} from "../../constants/appConstants";
import {useSelector, useDispatch} from "react-redux";
import {getPrecision, getThrottle, setThrottle, setPrecision} from "../../features/orderBookConfig/orderBookConfigSlice";
import {addBidsAndAsks, getAsks, getBids, resetData} from "../../features/orderBookData/orderBookConfigSlice";
import {OrderBookControlComponent} from "../../components/OrderBookControlComponent/OrderBookControlComponent";

export const OrderBookContainer = () => {
    const throttle = useSelector(getThrottle)
    const precision = useSelector(getPrecision)
    const bids = useSelector(getBids)
    const asks = useSelector(getAsks)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const w = new WebSocket(API_URL)

        let data: any[] = [];
        const flush = () => {
            dispatch(addBidsAndAsks(data))
            data = [];
        };

        let timer = setInterval(flush, throttle);

        w.addEventListener('message', function (event) {
            const parsed = JSON.parse(event.data)
            if (parsed.event) return

            if (!parsed.event) {
                data.push(parsed)
            }
        });

        w.addEventListener('open', function (event) {
            w.send(JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                prec: precision,
            }))
        });

        w.addEventListener('close', function (event) {
            w.close();
        })

        // todo if precision changes do not flush on unmount
        return () => {
            clearInterval(timer);
            w.close();
            flush();
        };
    }, [throttle, precision, dispatch])

    const _setThrottle = (throttle: number): void => {
        dispatch(setThrottle(throttle))
    }

    const _setPrecision = (precision: string): void => {
        dispatch(setPrecision(precision))
        dispatch(resetData())
    }

    return (
        <div>
            <OrderBookControlComponent
                precision={precision}
                setPrecision={_setPrecision}
                throttle={throttle}
                setThrottle={_setThrottle}
            />
            <OrderBookTableComponent
                side={BIDS}
                asksBids={bids}
            />
            <OrderBookTableComponent
                side={ASKS}
                asksBids={asks}
            />
        </div>
    );
}
