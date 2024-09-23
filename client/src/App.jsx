import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CookieSection from './components/CookieSection.jsx';
import UpgradeShop from './components/UpgradeSection.jsx';
import Sidebar from './components/Sidebar.jsx';
import './App.css';

export default function App() {

  const [cookieCount, setCookieCount] = useState(() => {
    const initValue = JSON.parse(localStorage.getItem("cookieCount"));
    console.log("SETTING INITIAL COOKIE COUNT: ", initValue)
    return initValue || 0;
  });
  const [cookieCPS, setCookieCPS] = useState(() => {
    const initValue = JSON.parse(localStorage.getItem("cookieCPS"));
    console.log("SETTING INITIAL COOKIE CPS: ", initValue)
    return initValue || 0;
  });

  useEffect(() => {
    localStorage.setItem("cookieCount", cookieCount);
  },[cookieCount]);

  useEffect(() => {
    localStorage.setItem("cookieCPS", cookieCPS);
  },[cookieCPS]);

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

        <CookieSection cookieCPS={cookieCPS} cookieCount={cookieCount} setCookieCount={setCookieCount}/>

        <UpgradeShop cookieCPS={cookieCPS} setCookieCPS={setCookieCPS} cookieCount={cookieCount} setCookieCount={setCookieCount}/>
        <footer></footer>
      </main>
      <Sidebar enabled={sidebarEnabled}/>
    </>
  )
}