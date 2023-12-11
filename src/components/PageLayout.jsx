// PageLayout.js

import React from 'react';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom/dist';

const PageLayout = () => {
    return (
        <div className>
            <SearchBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default PageLayout;
