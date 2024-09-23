import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CookieSection from './components/CookieSection.jsx';
import UpgradeShop from './components/UpgradeSection.jsx';
import Sidebar from './components/Sidebar.jsx';
import './App.css';

export default function App() {

  const [cookieCount, setCookieCount] = useState(() => {
    const initValue = JSON.parse(localStorage.getItem("cookieCount"));
    console.log("SETTING INITIAL COOKIE COUNT: ", initValue);
    return initValue || 0;
  });
  const [cookieCPS, setCookieCPS] = useState(() => {
    const initValue = JSON.parse(localStorage.getItem("cookieCPS"));
    console.log("SETTING INITIAL COOKIE CPS: ", initValue);
    return initValue || 0;
  });
  const [statsTimePlayed, setStatsTimePlayed] = useState(() => {
    const initValue = JSON.parse(localStorage.getItem("statsTimePlayed"));
    console.log("GETTING TIME PLAYED: ", initValue);
    return initValue || 0;
  });

  const [statsManualClicks, setStatsManualClicks] = useState(() => {
    const initValue = JSON.parse(localStorage.getItem("statsManualClicks"));
    console.log("GETTING MANUAL CLICKS: ", initValue);
    return initValue || 0;
  });

  useEffect(() => {
    localStorage.setItem("cookieCount", cookieCount);
  },[cookieCount]);

  useEffect(() => {
    localStorage.setItem("cookieCPS", cookieCPS);
  },[cookieCPS]);

  useEffect(() => {
    localStorage.setItem("statsTimePlayed", statsTimePlayed);
  }, [statsTimePlayed]);

  useEffect(() => {
    localStorage.setItem("statsManualClicks", statsManualClicks);
  }, [statsManualClicks]);

  function clearLocalStorage() {
    setCookieCount(0)
    setCookieCPS(0);
    localStorage.clear();
  }

  let [sidebarEnabled, setSidebarEnabled] = useState(false);
  const toggleSidebar = () => {
    setSidebarEnabled(prevState => !prevState);
  }

  return (
    <>

      <main className={sidebarEnabled ? "sidebar-active" : undefined}>
        <Header/>

        <div className="settings-button">
          <i className="fa-solid fa-gear settings-icon cookiefill-icon" onClick={toggleSidebar}></i>
        </div>

        <CookieSection cookieCPS={cookieCPS} cookieCount={cookieCount} setCookieCount={setCookieCount} setStatsManualClicks={setStatsManualClicks}/>

        <UpgradeShop cookieCPS={cookieCPS} setCookieCPS={setCookieCPS} cookieCount={cookieCount} setCookieCount={setCookieCount}/>
        <footer></footer>
      </main>
      <Sidebar enabled={sidebarEnabled} statsTimePlayed={statsTimePlayed} setStatsTimePlayed={setStatsTimePlayed} statsManualClicks={statsManualClicks} setStatsManualCicks={setStatsManualClicks} clearLocalStorage={clearLocalStorage}/>
    </>
  )
}