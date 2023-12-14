import React from 'react';
import { FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa';
import { CgMail } from "react-icons/cg";
import '../styles/Footer.css'; // Import the stylesheet

const Footer = () => {
    // Get the current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        // Footer container with two main sections: footer-description and social-handles
        <footer className="footer-container">
            <div className="footer-content">
                {/* Description section with "Hacker news" */}
                <p className="footer-description">
                    <span>Hacker news</span>
                </p>

                {/* Copyright section with the current year and author information */}
                <p>
                    <span>© {currentYear} Ankit Mishra . All Rights Reserved.</span>
                </p>

                {/* Social handles section with links to LinkedIn, YouTube, GitHub, and email */}
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
