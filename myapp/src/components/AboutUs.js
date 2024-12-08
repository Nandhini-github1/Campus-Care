import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>About Us</h1>
                <p>Welcome to our Campus Care Management System. We are dedicated to providing a platform that allows students and staff to address their request in a streamlined and efficient manner.</p>
            </div>
            
            <div className="about-us-content">
                <section className="about-us-section">
                    <h2>Our Mission</h2>
                    <p>Our mission is to ensure a transparent and efficient process for handling request within the college community. We aim to facilitate a platform where all users feel heard and their concerns are addressed swiftly.</p>
                </section>

                <section className="about-us-section">
                    <h2>What We Offer</h2>
                    <ul>
                        <li>Simple and easy-to-use interface for submitting request.</li>
                        <li>Dedicated dashboards for students, hostel staff, food services, and administrators.</li>
                        <li>Real-time updates on request status and resolutions.</li>
                        <li>Secure and confidential request submission process.</li>
                    </ul>
                </section>

                <section className="about-us-section">
                    <h2>Our Team</h2>
                    <p>We are a team of passionate developers, administrators, and support staff who believe in fostering a healthy communication environment within the college. Our goal is to build trust and ensure that every concern is addressed.</p>
                </section>

                <section className="about-us-section">
                    <h2>Contact Us</h2>
                    <p>Feel free to reach out to us for any questions or support:</p>
                    <p>Email: support@requestmanagement.com</p>
                    <p>Phone: +1 (234) 567-8900</p>
                    <p>Address:Marry Land, Madurai,Tamil Nadu</p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
