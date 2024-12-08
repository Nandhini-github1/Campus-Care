import React from 'react';
import { Link } from 'react-router-dom';
import './CommonPage.css';  // Custom CSS file for the common layout

const CommonPage = ({ children }) => {
    return (
        <div>
            <header className="header">
                <div className="header-top">
                    <img src="/images/logo1.jpg" alt="College Logo" className="logo" />
                    <div className="college-info">
                        <h1 className="college-name">XYZ College of Technology</h1>
                        <p className="college-address">123, Main Street, City, Country - 123456</p>
                    </div>
                </div>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                        <li><Link to="/">Grievance</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}  {/* Render the content of the page here */}
            </main>
        </div>
    );
};

export default CommonPage;
