// Import React and ReactDOM from the appropriate packages
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the Redux Provider and the Redux store
import { Provider } from 'react-redux';
import store from './app/store';

// Import the main application component
import App from './App';

// Import the main styles for the application
import './index.css';

// Create a root for rendering using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside the created root using React.StrictMode
// Wrap the entire application with the Redux Provider providing the Redux store
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
