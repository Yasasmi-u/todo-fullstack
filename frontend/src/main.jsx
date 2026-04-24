import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#1a1a2e',
          color: '#e8e8f0',
          border: '1px solid #2d2d4e',
          borderRadius: '12px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
        },
        success: { iconTheme: { primary: '#7c6af7', secondary: '#1a1a2e' } },
        error: { iconTheme: { primary: '#f76a6a', secondary: '#1a1a2e' } },
      }}
    />
  </React.StrictMode>
);
