// PageLayout.js

import React from 'react';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom/dist';
import "../styles/Pagelayout.css"

const PageLayout = () => {
    return (
        <>
            <SearchBar />
            <div className="main">
                <Outlet />

            </div>
            <Footer className="footer" />
        </>
    );
};

export default PageLayout;
