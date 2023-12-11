import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { getAllData } from '../features/search/searchSlice';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import "../styles/SearchBar.css"
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const debouncedSearch = _debounce((newQuery) => {
        dispatch(getAllData(newQuery));
    }, 300);

    const handleSearch = () => {
        debouncedSearch(query);
        navigate('/');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        dispatch(getAllData(''));
    }, [dispatch]);

    return (
        <nav className="search-bar">
            <div className="logo-container">
                <div className="logo">
                    <span className="logo-text">H</span>
                </div>
                <span className="logo-text">acker News</span>
            </div>

            <ul className="nav-links">
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        HOME
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={() => navigate('/')}>
                        ABOUT US
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
                        CONTACT US
                    </button>
                </li>
            </ul>


            <div className="search-container">
                <span className="search-icon">
                    <FaSearch />
                </span>
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

export default SearchBar;
