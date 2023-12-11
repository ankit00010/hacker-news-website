import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import SearchResults from './components/SearchResults';
import PostDetails from './components/PostDetails';

function App() {
  return (
    <div className='bg-black-500'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout />
            }

          >
            <Route
              path="/"
              element={
                <SearchResults />
              }

            />
            <Route
              path="/post/:objectId"
              element={
                <PostDetails />
              }
            />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
