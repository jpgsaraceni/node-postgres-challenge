import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// gets the root element from the public html and renders the React App.
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
