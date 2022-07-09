import React from "react";

interface IOrderBookControlComponent {
    precision: number
    setPrecision: (precision: number) => void
    throttle: number
    setThrottle: (precision: number) => void
}

export const OrderBookControlComponent: React.FC<IOrderBookControlComponent> = (props) => {
    const {precision, setPrecision, throttle, setThrottle} = props;

    return (
        <>
            <div>
                <p>Precision level {precision}</p>
                <button onClick={() => setPrecision(1)}>1</button>
                <button onClick={() => setPrecision(2)}>2</button>
                <button onClick={() => setPrecision(3)}>3</button>
                <button onClick={() => setPrecision(4)}>4</button>
                <button onClick={() => setPrecision(5)}>5</button>
            </div>
            <div>
                <p>Throttle {throttle < 300 ? 0 : throttle}</p>
                <button onClick={() => setThrottle(200)}>No</button>
                <button onClick={() => setThrottle(5000)}>~5000</button>
            </div>
        </>
    );
}
