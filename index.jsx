// Import all the important pieces!
import React from 'react';
import ReactDOM from 'react-dom/client'
import App from "./src/app";

// This is essentially identifying the root component of index.html and rendering whatever is in App.jsx there.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);