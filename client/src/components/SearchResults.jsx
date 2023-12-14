// Importing React and necessary hooks and components
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Importing selectors and actions from the searchSlice file
import { selectSearchResults, selectTotalPages } from '../features/search/searchSlice';
import { getAllData, getPaginationData } from '../features/search/searchSlice';

// Importing the NewsCard component for displaying individual search results
import NewsCard from './NewsCard';

// Importing styles for SearchResults
import '../styles/SearchResults.css';

// Functional component for displaying search results and pagination
const SearchResults = () => {
    // Creating a dispatch function for Redux actions
    const dispatch = useDispatch();

    // Retrieving search results and total pages from the Redux store
    const results = useSelector(selectSearchResults);
    const totalPages = useSelector(selectTotalPages);

    // State to manage the current page and loading status
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Effect to fetch all data when the component mounts
    useEffect(() => {
        setLoading(true);
        dispatch(getAllData(''));
    }, [dispatch]);

    // Effect to update loading status when search results change
    useEffect(() => {
        if (results.length > 0) {
            setLoading(false);
        }
    }, [results]);

    // Function to handle page changes and fetch paginated data
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setLoading(true);
        dispatch(getPaginationData({ query: '', page: newPage }));
    };

    // Function to render pagination buttons
    const renderPaginationButtons = () => {
        const buttons = [];
        const totalPagesToShow = 5;
        const pagesPerSet = 5;

        // Add previous button if not on the first page
        if (currentPage > 1) {
            buttons.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="bg-orange-500 text-white p-2 rounded-md"
                >
                    PREV
                </button>
            );
        }

        // Page buttons
        const startPage = Math.floor((currentPage - 1) / pagesPerSet) * pagesPerSet + 1;
        const endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 px-3 py-2 rounded-md ${currentPage === i ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'
                        }`}
                >
                    {i}
                </button>
            );
        }

        // Add next button if not on the last page
        buttons.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-orange-500 text-white p-2 rounded-md"
            >
                NEXT
            </button>
        );

        return buttons;
    };

    // Render the component
    return (
        <div className="container">
            <h2 className="title">Search Results</h2>
            {loading ? (
                // Display a loading message while data is being fetched
                <p>Loading...</p>
            ) : (
                // Display search results and pagination when data is loaded
                <div>
                    <div className="grid-container">
                        {/* Rendering NewsCard component for each search result */}
                        {results.map((result) => (
                            <NewsCard key={result.objectID} {...result} />
                        ))}
                    </div>
                    <div className="pagination flex items-center justify-center mt-4">
                        {/* Rendering pagination buttons */}
                        {renderPaginationButtons()}
                    </div>
                </div>
            )}
        </div>
    );
};

// Exporting the SearchResults component as the default export
export default SearchResults;
