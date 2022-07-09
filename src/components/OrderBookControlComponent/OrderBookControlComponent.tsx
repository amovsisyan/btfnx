import React from "react";
import {PRECISIONS} from "../../constants/appConstants";

interface IOrderBookControlComponent {
    precision: string
    setPrecision: (precision: string) => void
    throttle: number
    setThrottle: (precision: number) => void
}

export const OrderBookControlComponent: React.FC<IOrderBookControlComponent> = (props) => {
    const {precision, setPrecision, throttle, setThrottle} = props;

    return (
        <>
            <div>
                <p>Precision level {precision}</p>
                {
                    Object.keys(PRECISIONS).map(precision => {
                        return (
                            <button onClick={() => setPrecision(precision)}>{precision}</button>
                        );
                    })
                }
            </div>
            <div>
                <p>Throttle {throttle < 300 ? 0 : throttle}</p>
                <button onClick={() => setThrottle(200)}>No</button>
                <button onClick={() => setThrottle(5000)}>~5000</button>
            </div>
        </>
    );
}
