import { useState } from 'react';

export default function Upgrade({addCPS,removeCookies,cookieCount,name,cost,power,img}){

    let [amount,setAmount] = useState(0);

    function buyUpgrade() {
        if (cookieCount < cost) {return};
        addCPS(parseInt(power));
        removeCookies(parseInt(cost));
        setAmount(amount+1);
    }

    let divClass = "upgrade-container";
    let enabled = true;
    if (cookieCount < cost) {
        enabled = false;
        divClass += " disabled-upgrade"
    }


    return (
        <div className={divClass}>
            <h3>{name}</h3>
            <img className="upgrade-img" src={img}/>
            {/* <p>Amount: {amount}</p> */}
            <p>
                <b>Cost: </b>🍪{cost}<br/>
                <b>Power: </b>⚡{power}
            </p>
            <button onClick={buyUpgrade}>Buy</button>
        </div>
    )
}  