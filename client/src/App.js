// Import necessary modules from the 'react' and 'react-router-dom' packages.
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components used in the application.
import PageLayout from './components/PageLayout';
import SearchResults from './components/SearchResults';
import PostDetails from './components/PostDetails';

// Define the main application component.
function App() {
  // Render the application with a black background.
  return (
    <div className='bg-black-500'>
      {/* Use the 'Router' component from 'react-router-dom' to set up routing. */}
      <Router>
        {/* Use the 'Routes' component to define different routes in the application. */}
        <Routes>
          {/* Define a route for the root path '/' that uses the 'PageLayout' component. */}
          <Route
            path="/"
            element={<PageLayout />}
          >
            {/* Nested routes for the root path '/'. */}

            {/* Define a route for the root path '/' that renders the 'SearchResults' component. */}
            <Route
              path="/"
              element={<SearchResults />}   /*children of PageLayout*/
            />

            {/* Define a route for '/post/:objectId' that renders the 'PostDetails' component. */}
            <Route
              path="/post/:objectId"
              element={<PostDetails />}  /*children of PageLayout*/
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
//Exported
export default App;
