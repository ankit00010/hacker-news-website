// SearchResults.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../features/search/searchSlice';
import NewsCard from './NewsCard';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const results = useSelector(selectSearchResults);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (results.length > 0) {
            setLoading(false);
        }
    }, [results]);

    return (
        <div className="container">
            <h2 className="title">Search Results</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid-container">
                    {results.map((result) => (
                        <NewsCard key={result.objectID} {...result} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
