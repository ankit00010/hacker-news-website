import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchResults, selectTotalPages } from '../features/search/searchSlice';
import { getAllData, getPaginationData } from '../features/search/searchSlice';
import NewsCard from './NewsCard';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const dispatch = useDispatch();
    const results = useSelector(selectSearchResults);
    const totalPages = useSelector(selectTotalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(getAllData(''));
    }, [dispatch]);

    useEffect(() => {
        if (results.length > 0) {
            setLoading(false);
        }
    }, [results]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setLoading(true);
        dispatch(getPaginationData({ query: '', page: newPage }));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const totalPagesToShow = 5;
        const pagesPerSet = 5;

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

        // Next button
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


    return (
        <div className="container">
            <h2 className="title">Search Results</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="grid-container">
                        {results.map((result) => (
                            <NewsCard key={result.objectID} {...result} />
                        ))}
                    </div>
                    <div className="pagination flex items-center justify-center mt-4">
                        {renderPaginationButtons()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
