// Importing React and necessary hooks and components
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { getAllData } from '../features/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';

// Importing styles for SearchBar
import "../styles/SearchBar.css";

// Functional component for the search bar in the application
const SearchBar = () => {
    // State to hold the search query
    const [query, setQuery] = useState('');

    // Redux dispatch function
    const dispatch = useDispatch();

    // React Router navigate function
    const navigate = useNavigate();

    // Debouncing the search function to reduce unnecessary API calls
    const debouncedSearch = _debounce((newQuery) => {
        dispatch(getAllData(newQuery));
    }, 300);

    // Handling the search button click event
    const handleSearch = () => {
        // Triggering the debounced search function and navigating to the home page
        debouncedSearch(query);
        navigate('/');
    };

    // Handling Enter key press in the search input
    const handleKeyPress = (event) => {
        // Triggering the search function if Enter key is pressed
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // Fetching all data when the component mounts
    useEffect(() => {
        dispatch(getAllData(''));
    }, [dispatch]);

    return (
        // Navigation bar container with a logo, navigation links, and search input
        <nav className="search-bar">
            {/* Logo and application name */}
            <div className="logo-container">
                <div className="logo">
                    <span className="logo-text">H</span>
                </div>
                <span className="logo-text">acker News</span>
            </div>

            {/* Navigation links */}
            <ul className="nav-links">
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        HOME
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        ABOUT
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        SERVICES
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        NEWS
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        CONTACT
                    </button>
                </li>
            </ul>

            {/* Search input container with search icon */}
            <div className="search-container">
                <span className="search-icon">
                    <FaSearch />
                </span>
                {/* Search input field */}
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search Hacker News"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </nav>
    );
};

// Exporting the SearchBar component as the default export
export default SearchBar;
