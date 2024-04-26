'use client'
import 'react' from 'react'
import styles from '@/styles/navbar.css'
const Navbar=()=>{
    return(
        <>
          <nav class="sidebar close">
        <header>
        <div class="image_text">
            <span class="image">
                <img src="logo.jpg" alt="logo">
            </span>
            <div class="text header-text">
                <span class="name">FAAA</span>
                <span class="profession">CRM</span>
            </div>
        </div>
        <i class='bx bx-chevron-right toggle'></i>
        </header>
        <div class="menubar">
            <div class="menu">
                <li class="search-box">
                        <i class='bx bx-search icon '></i>  
                        <input  type="text" placeholder="Search...">
                </li>
                <ul class="menulinks">
                    <li class="navlinks">
                        <a href="#">
                            <i class='bx bxs-dashboard icon' ></i>
                            <span class="text nav-text">Dashboard</span>
                        </a>
                    </li>
                    <li class="navlinks">
                        <a href="/leads/createform">
                            <i class='bx bxs-user icon' ></i>
                            <span class="text nav-text">Leads</span>
                        </a>
                        <ul class="submenu"> <!-- Submenu for Dashboard dropdown -->
                            <li><a href="#">Overall</a></li>
                            <li><a href="#">Import Leads</a></li>
                            <li><a href="#">Add Leads</a></li>
                        </ul>
                    </li>
                    </li>
                    <li class="navlinks">
                        <a href="#">
                            <i class='bx bxs-notepad icon' ></i>
                            <span class="text nav-text">Project</span>
                        </a>
                        <ul class="submenu">
                            <!-- Submenu for Project -->
                            <li><a href="#">Overall</a></li>
                            <li><a href="#">Add Project</a></li>
                        </ul>
                    </li>
                    <li class="navlinks">
                        <a href="#">
                            <i class='bx bxs-group icon' ></i>
                            <span class="text nav-text">Users</span>
                        </a>
                        <ul class="submenu">
                            <!-- Submenu for Users -->
                            <li><a href="#">Overall</a></li>
                            <li><a href="#">Add User</a></li>
                            <li><a href="#">Feedbacks</a></li>
                        </ul>
                    </li>
                    <li class="navlinks">
                        <a href="#">
                            <i class='bx bxs-purchase-tag-alt icon' ></i>
                            <span class="text nav-text">Campaign</span>
                        </a>
                    </li>
                    <li class="navlinks">
                        <a href="#">
                            <i class='bx bxs-bar-chart-alt-2 icon' ></i>
                            <span class="text nav-text">Performance</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bottom-content">
                <li class="navlinks">
                    <a href="#">
                        <i class='bx bxs-log-out icon' ></i>
                        <span class="text nav-text">Logout</span>
                    </a>
                </li>
    
                <li class="mode">
                    <div class="moon-sun">
                        <i class='bx bxs-moon icon moon' ></i>
                        <i class='bx bxs-sun icon sun' ></i>
                    </div>      
                    <span class="mode-text text">Dark Mode</span>   
                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>       
                </li>
            </div>
        </div>
    </nav>
        </>
    )
}
export default Navbar;
