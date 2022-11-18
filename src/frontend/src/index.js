import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from "./contexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import { RequestProvider } from './contexts/Request'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <AuthContextProvider>
        <RequestProvider>
          <App />
        </RequestProvider>
      </AuthContextProvider>
    </BrowserRouter>
);