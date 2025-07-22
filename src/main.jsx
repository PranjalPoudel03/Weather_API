import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import DetailView from './components/DetailView';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:date" element={<DetailView />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
