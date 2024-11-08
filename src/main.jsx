import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './Context/GlobalState.jsx';
import { BrowserRouter } from 'react-router-dom'; // Make sure BrowserRouter is imported

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* BrowserRouter wraps everything */}
      <AuthProvider> {/* AuthProvider is inside BrowserRouter */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
