import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import './Sidebar.css'


export default function Sidebar({enabled, statsTimePlayed, setStatsTimePlayed, statsManualClicks, setStatsManualCicks, clearLocalStorage}) {

    let divClassName = "sidebar"
    if (enabled) {
        divClassName += " sidebar-enabled";
        setTimeout( () => {
            divClassName +=" sidebar-overflow-fix"
        },750);
    }

    function msToDHMS(ms) {
        let secs    = Math.floor( (ms / 1000) % 60 );
        let mins    = Math.floor( (ms / (1000 * 60)) % 60 );
        let hours   = Math.floor( (ms / (1000 * 60 * 60)) % 60 );
        let days    = Math.floor( (ms / (1000 * 60 * 60 * 24)) % 60);
        return [days,hours,mins,secs];
    }
    function msToTimeString(ms) {
        let days    = msToDHMS(ms)[0];
        let hours   = msToDHMS(ms)[1];
        let mins    = msToDHMS(ms)[2];
        let secs    = msToDHMS(ms)[3];
        return `${days}d ${hours}h ${mins}m ${secs}s`;
    }

    let [sessionTime, setSessionTime] = useState(Date.now());
    const [sessionStartTime, setSessionStartTime] = useState(Date.now);
    const lastTickRef = useRef(Date.now());
    const sessionStartTimeRef = useRef(sessionStartTime);
    useEffect(() => {
        sessionStartTimeRef.current = sessionStartTime;
    }, [sessionStartTime]);
    
    function resetButton() {
        clearLocalStorage();
        setSessionStartTime(Date.now());
        sessionStartTimeRef.current = Date.now();
        setSessionTime(0);
        setStatsTimePlayed(0);
        setStatsManualCicks(0);
    }

    useEffect(() => {

        const interval = setInterval(() => {

            setSessionTime(Date.now() - sessionStartTimeRef.current);

            let tickTime = Date.now() - lastTickRef.current;
            setStatsTimePlayed((prevCount) => prevCount + tickTime);
            lastTickRef.current = Date.now();


        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);



    return (
        <div className={divClassName}>
            <div className="sidebar-content">
                <h2 className="cookiefill-text">Settings</h2>
                <button id="settings-reset" onClick={resetButton}>Reset Progress</button>
                <h2 className="cookiefill-text">Stats</h2>
                <p className="stats-title">Session Play Time</p>
                <p className="stats" id="stats-session-time">{msToTimeString(sessionTime)}</p>
                <p className="stats-title">Total Time Played</p>
                <p className="stats" id="stats-time-played">{msToTimeString(statsTimePlayed)}</p>
                <p className="stats-title">Manual Clicks</p>
                <p className="stats" id="stats-manual-clicks">{statsManualClicks}</p>
            </div>
        </div>
    )
}