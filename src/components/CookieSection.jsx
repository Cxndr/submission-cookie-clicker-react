import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import './CookieSection.css';


export default function CookieSection({cookieCPS,cookieCount,setCookieCount,setStatsManualClicks}) {

    const cookieCPSRef = useRef(cookieCPS);
    const [cookieClicked, setCookieClicked] = useState(false);

    // update reference when CPS changes.
    useEffect(() => {
        cookieCPSRef.current = cookieCPS;
    }, [cookieCPS]);
    
    function cookieClick(event) {
        setCookieCount(cookieCount+1);
        setStatsManualClicks((prevCount) => prevCount += 1);
        cookieClickAnim();
        for(let i=0; i<3; i++) {
            cookieClickParticle(event.clientX,event.clientY, 0.15,0.7);
        }
        for(let i=0; i<10; i++) {
            cookieClickParticle(event.clientX, event.clientY,0.05,0.25);
        }
    }

    function updateCookies() {
        // using useRef so that we don't need dependecy for cookieCPS in the interval (so changing cookieCPS doesn't reset the timer interval)
        setCookieCount((prevCount) => prevCount + cookieCPSRef.current);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateCookies();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function cookieClickAnim() {
        setCookieClicked(true);
        setTimeout(function(){
            setCookieClicked(false);
        }, 100);
    }

    const cookieSection = useRef();
    function cookieClickParticle(x,y,minSize, maxSize) {
        const cookieParticle = document.createElement('span');
        cookieParticle.textContent = "🍪";
        let particleSize = Math.random()*(maxSize-minSize)+maxSize;
        cookieParticle.classList.add ("cookie-particle")
        cookieParticle.style.fontSize = particleSize+"rem";
        cookieParticle.style.left = x + "px";
        cookieParticle.style.top = y + "px";
        cookieSection.current.appendChild(cookieParticle);
        
        // transition to animate random direction
        const distance = 100; // setting for how far to travel
        const angle = Math.random()*2*Math.PI // get angle in radians:-
            // (0 to 1) * 2 * 3.14 = (0 to 6.28 radians) = (0° to 360°)
        const xOffset = Math.floor(Math.cos(angle) * distance);
        const yOffset = Math.floor(Math.sin(angle) * distance);
        setTimeout(function() {
            cookieParticle.style.opacity = "0";
            cookieParticle.style.left = (x + xOffset)+"px";
            cookieParticle.style.top = (y + yOffset)+"px"
        },50);
        setTimeout(function() {
            cookieParticle.remove();
        },750);
    }


    return (
        <section className="cookie-section" ref={cookieSection}>
            
            <img 
                src="./img/cookie.png"
                id="cookie"
                className={cookieClicked ? "cookie cookie-click-anim" : "cookie"}
                onMouseDown={cookieClick}
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