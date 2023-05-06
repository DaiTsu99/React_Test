import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
        
    
    return(
        <div className="navbar">
                <ul className="navi">
                    <li className="list">
                        <NavLink to="/Home"  className={isActive =>
                            !isActive.isActive ? "unselectedPage" : "selectedPage"
                        }>Home</NavLink>
                    </li>
                    <li className="list">
                        <NavLink to="/Post" className={isActive =>
                            !isActive.isActive ? "unselectedPage" : "selectedPage"
                        }>JSONPost
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink to="/Weather" className={isActive =>
                            !isActive.isActive ? "unselectedPage" : "selectedPage"
                        }>Weather
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink to="/GoRest" className={isActive =>
                            !isActive.isActive ? "unselectedPage" : "selectedPage"
                        }>GoRest API
                        </NavLink>
                    </li>
                </ul>
        </div>
    );
}

export default Nav;