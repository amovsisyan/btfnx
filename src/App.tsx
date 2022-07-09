import React from 'react';
import './App.css';

function App() {
    const [precision, setPrecision] = React.useState(1);
    const [throttle, setThrottle] = React.useState(200);
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
                const [channel, msg] = value

                const pp = { price: msg[0], cnt: msg[1], amount: msg[2] }
                let side = pp.amount >= 0 ? 'bids' : 'asks';

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

    return (
        <div className="App">
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
            <table>
                <tr>
                    <th>
                        Count
                    </th>
                    <th>
                        Amount
                    </th>
                    <th>
                        Price
                    </th>
                </tr>
                    {
                        Object.keys(bids).sort(function (a, b) {
                            return +a >= +b ? -1 : 1
                        }).map((price) => (
                            <tr>
                                <td>{bids[price].cnt}</td>
                                <td>{Math.round((bids[price].amount + Number.EPSILON) * 1000) / 1000}</td>
                                <td>{bids[price].price}</td>
                            </tr>
                        ))
                    }
            </table>
            <table>
                <tr>
                    <th>
                        Count
                    </th>
                    <th>
                        Amount
                    </th>
                    <th>
                        Price
                    </th>
                </tr>
                    {
                        Object.keys(asks).sort(function (a, b) {
                            return +a <= +b ? -1 : 1
                        }).map((price) => (
                            <tr>
                                <td>{asks[price].cnt}</td>
                                <td>{Math.round((asks[price].amount + Number.EPSILON) * 1000) / 1000}</td>
                                <td>{asks[price].price}</td>
                            </tr>
                        ))
                    }
            </table>
        </div>
    );
}

export default App;
