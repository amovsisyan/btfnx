import React from "react";

interface IOrderBookTableComponent {
    asksBids: any[]
}

export const OrderBookTableComponent: React.FC<IOrderBookTableComponent> = (props) => {
    const { asksBids } = props;
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
            asksBids.map((price) => (
                <tr>
                    <td>{asksBids[price].cnt}</td>
                    <td>{Math.round((asksBids[price].amount + Number.EPSILON) * 1000) / 1000}</td>
                    <td>{asksBids[price].price}</td>
                </tr>
            ))
        }
    </table>
}
