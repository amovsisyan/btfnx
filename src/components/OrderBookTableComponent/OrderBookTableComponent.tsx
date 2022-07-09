import React from "react";
import {ASKS, BIDS} from "../../constants/appConstants";

interface IOrderBookTableComponent {
    asksBids: any
    side: typeof BIDS | typeof ASKS
}

export const OrderBookTableComponent: React.FC<IOrderBookTableComponent> = (props) => {
    const { asksBids, side } = props;
    return <table>
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
            Object.keys(asksBids).sort(function (a, b) {
                if (side === BIDS) {
                    return +a >= +b ? -1 : 1
                }

                return +a <= +b ? -1 : 1
            }).map((price) => (
                <tr>
                    <td>{asksBids[price].cnt}</td>
                    <td>{Math.round((asksBids[price].amount + Number.EPSILON) * 1000) / 1000}</td>
                    <td>{asksBids[price].price}</td>
                </tr>
            ))
        }
    </table>
}
