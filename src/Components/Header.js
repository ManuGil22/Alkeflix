// Libraries
import React from "react";
import { Link } from 'react-router-dom';

// Stylesheets
import '../Stylesheets/Header.css';

function Header() {
    return(
        <div className="header-container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="nav-link"><span className="navbar-brand">AlkeFlix</span></Link>
                    <ul className="navbar-nav">
                        <Link to="/movies" className="nav-link"><li className="nav-item">Movies</li></Link>
                        <Link to="/favorites" className="nav-link"><li className="nav-item">Favorites</li></Link>
                        <Link to="/login" className="nav-link ms-auto me-4"><li className="nav-item">Login</li></Link>
                    </ul>
                </div>                
            </nav>
        </div>
    )
}

export default Header;