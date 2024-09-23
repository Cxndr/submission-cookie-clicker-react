import { useState } from "react";
import { useEffect } from "react";
import Upgrade from "./Upgrade";
import './UpgradeSection.css';

export default function UpgradeShop({cookieCPS,setCookieCPS, cookieCount, setCookieCount}) {

    function addCPS(amount) {
        setCookieCPS(cookieCPS+amount);
    }
    function removeCookies(amount) {
        setCookieCount(cookieCount-amount);
    }

    const [upgradesArray, setUpgradesArray] = useState([]);

    useEffect(() => {
        async function fetchUpgrades() {
            try {
                const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
                setUpgradesArray(await response.json());
            } catch(error) {console.error(error);}
        }
        fetchUpgrades();
    },[]);


    return (
        <section id="upgrade-shop" className="shop">

            {upgradesArray.map((upgrade) => {
                return (
                    <Upgrade
                        key={upgrade.id}
                        addCPS={addCPS}
                        removeCookies={removeCookies}
                        cookieCount={cookieCount}
                        name={upgrade.name}
                        power={upgrade.increase}
                        cost={upgrade.cost}
                        img={`/img/icons/${upgrade.id}.png`}
                    />
                )
            })}

        </section>
    );
}