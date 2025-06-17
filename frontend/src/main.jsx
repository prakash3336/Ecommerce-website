import React from 'react'; // Required for JSX
import { createRoot } from 'react-dom/client'; // For React 18+
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx'; // ✅ correct context provider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>   
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
);
