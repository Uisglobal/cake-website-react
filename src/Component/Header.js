import React from "react";
import { Link } from 'react-router-dom';
import '../Styles/Header.css'

const Header = () => {
    return(
        <div>
            <header className="header">
                <h1 className="logo">Kabhi B</h1>
                <nav className="nav-links">
                <Link to="/products" className="nav-link button">Home</Link>
                <Link to="/cart" className="nav-link button">View Cart</Link>
                <Link to="/loginsignup" className="nav-link button">Log In</Link>
                    {/* <Link to="/checkout" className="nav-link">Checkout</Link> */}
                </nav>
            </header>
        </div>
    );
};

export default Header;
