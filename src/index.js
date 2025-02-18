import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional: import your styles
import App from './frontend/App';  // Correct the path to point to the frontend folder
// Import the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // If using React Bootstrap
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap the entire app in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
