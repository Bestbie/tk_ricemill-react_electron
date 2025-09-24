import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Toaster position="top-right" reverseOrder={false} /> 
    <App />
  </HashRouter>
);
