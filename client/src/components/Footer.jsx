// Footer.js

import React from 'react';
import { FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';
import { CgMail } from "react-icons/cg";
import '../styles/Footer.css'; // Import the stylesheet

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p className="footer-description">
                    <span>Hacker news</span>
                </p>
                <p>
                    <span>© 2023 Ankit Mishra . All Rights Reserved.</span>
                </p>
                <div className="social-handles">
                    <a href="https://www.linkedin.com/in/ankit-ravindra-mishra-19050121a/" className="social-icon">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.youtube.com/watch?v=5ijHB7JALrs&list=PLFtWhjbsuiVxU91FdglaOToy1VDobJ97N&pp=gAQBiAQB" className="social-icon">
                        <FaYoutube />
                    </a>
                    <a href="https://github.com/ankit00010" className="social-icon">
                        <FaGithub />
                    </a>
                    <a href="mailto:gmailankitmishra.work005@gmail.com" className="social-icon">
                        <CgMail />
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
