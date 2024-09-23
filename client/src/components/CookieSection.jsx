import { useEffect } from "react";
import { useRef } from "react";
import './CookieSection.css';


export default function CookieSection({cookieCPS,cookieCount,setCookieCount}) {

    const cookieCPSRef = useRef(cookieCPS);

    // update reference when CPS changes.
    useEffect(() => {
        cookieCPSRef.current = cookieCPS;
    }, [cookieCPS]);
    
    function cookieClick() {
        setCookieCount(cookieCount+1);
        // localStorage.setItem("cookieCount", cookieCount+1);
    }

    function updateCookies() {
        // using useRef so that we don't need dependecy for cookieCPS in the interval (so changing cookieCPS doesn't reset the timer interval)
        setCookieCount((prevCount) => prevCount + cookieCPSRef.current);
        // localStorage.setItem("cookieCount", cookieCount);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateCookies();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <section className="cookie-section">
            
            <img 
                src="./img/cookie.png"
                id="cookie"
                className="cookie"
                onClick={cookieClick}
            />

            <section className="cookie-stats">
                
                <p>
                    Cookies<br/>
                    <span id="cookie-count" className="cookie-count">
                        🍪 {cookieCount}
                    </span>
                </p>

                <p>
                    Cookie Power<br/>
                    <span id="cookie-cps" className="cookie-cps">
                        ⚡ {cookieCPS}
                    </span>
                </p>

            </section>

        </section>
    )
}