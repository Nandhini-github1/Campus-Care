import React from 'react';
import { Link } from 'react-router-dom';
import './styles1.css';

const Homepage = () => {
    return (
        <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/clg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            width: "100vw"
        }}>
            <div className="homepage">

            <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                </nav>
               
                <header>
                    <img src="/images/fa.jpg" alt="Logo" className="logo" />
                    <div className="header-title">
                       &nbsp; &nbsp; <h1>FATIMA COLLEGE (Autonomous)</h1>
                        <h3>SISTERS OF ST.JOSEPH OF LYONS INSTITUTIONS</h3>
                        <h3>MARY LAND, MADURAI - 625018, TAMIL NADU</h3>

                    </div>
                   
                </header>
              

                <div className="login-container">
                    <div className="login-box">
                        <Link to="/admin-login">
                            <img src="/images/admin logo.jpg" alt="Admin Login" />
                            <h3>Admin Login</h3>
                        </Link>
                    </div>
                    <div className="login-box">
                        <Link to="/college-login">
                            <img src="/images/college.jpeg" alt="College Login" />
                            <h3>College Login</h3>
                        </Link>
                    </div>
                    <div className="login-box">
                        <Link to="/student-login">
                            <img src="/images/studentlogo.png" alt="Student Login" />
                            <h3>Student Login</h3>
                        </Link>
                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </div>
                    <div className="login-box">
                        <Link to="/hostel-login">
                            <img src="/images/hostellogo.png" alt="Hostel Login" />
                            <h3>Hostel Login</h3>
                        </Link>
                    </div>
                    <div className="login-box">
                        <Link to="/food-login">
                            <img src="/images/foodlogo.jpg" alt="Food Login" />
                            <h3>Food Login</h3>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
