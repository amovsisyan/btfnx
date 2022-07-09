import React from "react";
import {OrderBookTableComponent} from "../../components/OrderBookTableComponent/OrderBookTableComponent";
import {ASKS, BIDS} from "../../constants/appConstants";
import {useSelector, useDispatch} from "react-redux";
import {getThrottle, setThrottle} from "../../features/orderBookConfig/orderBookConfigSlice";
import {OrderBookControlComponent} from "../../components/OrderBookControlComponent/OrderBookControlComponent";

export const OrderBookContainer = () => {
    const throttle = useSelector(getThrottle)
    const dispatch = useDispatch()

    const [precision, setPrecision] = React.useState(1);
    const [bids, setBids]: any = React.useState({});
    const [asks, setAsks]: any = React.useState({});

    React.useEffect(() => {
        const w = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

        const data = new Set();
        const flush = () => {
            console.log(data, 9999);
            const existingBids = {...bids};
            const existingAsks = {...asks};
            // @ts-ignore
            for (const value of data) {
                const [_, msg] = value

                const pp = {price: msg[0], cnt: msg[1], amount: msg[2]}
                let side = pp.amount >= 0 ? BIDS : ASKS;

                pp.amount = Math.abs(pp.amount)
                if (side === 'bids') {
                    existingBids[pp.price] = pp;
                    setBids(existingBids)
                } else {
                    existingAsks[pp.price] = pp;
                    setAsks(existingAsks)
                }
            }
            data.clear();
        };

        let timer = setInterval(flush, throttle);

        w.addEventListener('message', function (event) {
            const parsed = JSON.parse(event.data)
            if (parsed.event) return

            if (!parsed.event) {
                data.add(parsed);
            }
        });

        w.addEventListener('open', function (event) {
            w.send(JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                // prec: precision,
            }))
        });

        w.addEventListener('close', function (event) {
            w.close();
        })

        return () => {
            clearInterval(timer);
            w.close();
            flush();
        };
    }, [throttle, precision])

    const _setThrottle = (throttle: number) => {
        dispatch(setThrottle(throttle))
    }

    return (
        <div>
            <OrderBookControlComponent
                precision={precision}
                setPrecision={setPrecision}
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
