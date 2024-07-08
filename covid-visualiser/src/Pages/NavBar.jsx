import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <div className='logo_elems'>
                        <div className='circle'></div>
                        <p className='logo_text'>JACE Inc.</p>
                    </div>
                </Link>
            </div>
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/visualisations" activeClassName="active">Visualisations</NavLink></li>
                <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="/help" activeClassName="active">Help</NavLink></li>
                <li><NavLink to="/aboutus" activeClassName="active">About Us</NavLink></li>
            </ul>
        </nav>
    );
};

export default NavBar;