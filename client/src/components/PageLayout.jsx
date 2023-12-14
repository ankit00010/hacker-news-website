
// Importing React for creating React components
import React from 'react';

// Importing components needed for the PageLayout
import SearchBar from './SearchBar';
import Footer from './Footer';

// Importing Outlet from react-router-dom for rendering nested routes
import { Outlet } from 'react-router-dom/dist';

// Importing the styles for PageLayout
import "../styles/Pagelayout.css"

// Functional component for the main layout of the page
const PageLayout = () => {
    return (
        <>
            {/* Rendering the SearchBar component at the top of the page */}
            <SearchBar />

            {/* Main content area where nested routes will be rendered */}
            <div className="main">
                <Outlet />
            </div>

            {/* Rendering the Footer component at the bottom of the page */}
            <Footer className="footer" />
        </>
    );
};

// Exporting the PageLayout component as the default export
export default PageLayout;
