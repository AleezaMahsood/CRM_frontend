'use client'
import 'react' from 'react'
const Navbar=()=>{
    return(
        <>
           <nav className="sidebar close">
        <header>
        <div className="image_text">
            <span className="image">
                <img src="logo.jpg" alt="logo" />
            </span>
            <div className="text header-text">
                <span className="name">FAAA</span>
                <span className="profession">CRM</span>
            </div>
        </div>
        <i className='bx bx-chevron-right toggle'></i>
        </header>
        <div className="menubar">
            <div className="menu">
                <li className="search-box">
                        <i className='bx bx-search icon '></i>  
                        <input  type="text" placeholder="Search..." />
                </li>
                <ul className="menulinks">
                    <li className="navlinks">
                        <a href="#">
                            <i className='bx bxs-dashboard icon' ></i>
                            <span className="text nav-text">Dashboard</span>
                        </a>
                    </li>
                    <li className="navlinks">
                        <a href="/leads/createform">
                            <i className='bx bxs-user icon' ></i>
                            <span className="text nav-text">Leads</span>
                        </a>
                    </li>
                    <li className="navlinks">
                        <a href="#">
                            <i className='bx bxs-notepad icon' ></i>
                            <span className="text nav-text">Project</span>
                        </a>
                    </li>
                    <li className="navlinks">
                        <a href="#">
                            <i className='bx bxs-group icon' ></i>
                            <span className="text nav-text">Users</span>
                        </a>
                    </li>
                    <li className="navlinks">
                        <a href="#">
                            <i className='bx bxs-purchase-tag-alt icon' ></i>
                            <span className="text nav-text">Campaign</span>
                        </a>
                    </li>
                    <li className="navlinks">
                        <a href="#">
                            <i className='bx bxs-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Performance</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="bottom-content">
                <li className="navlinks">
                    <a href="#">
                        <i className='bx bxs-log-out icon' ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
    
                <li className="mode">
                    <div className="moon-sun">
                        <i className='bx bxs-moon icon moon' ></i>
                        <i className='bx bxs-sun icon sun' ></i>
                    </div>      
                    <span className="mode-text text">Dark Mode</span>   
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>       
                </li>
            </div>
        </div>
    </nav>
        </>
    )
}
export default Navbar;
