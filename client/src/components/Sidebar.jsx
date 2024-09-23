import './Sidebar.css'


export default function Sidebar(enabled) {

    let divClassName = "sidebar"
    if (enabled) {
        divClassName += " sidebar-enabled";
        setTimeout( () => {
            divClassName +=" sidebar-overflow-fix"
        },750);
    }

    return (
        <div className={divClassName}>
            <div className="sidebar-content">
                <h2 className="cookiefill-text">Settings</h2>
                <button id="settings-reset">Reset Progress</button>
                <h2 className="cookiefill-text">Stats</h2>
                <p className="stats-title">Session Play Time</p>
                <p className="stats" id="stats-session-time">~</p>
                <p className="stats-title">Total Time Played</p>
                <p className="stats" id="stats-time-played">~</p>
                <p className="stats-title">Manual Clicks</p>
                <p className="stats" id="stats-manual-clicks">0</p>
            </div>
        </div>
    )
}