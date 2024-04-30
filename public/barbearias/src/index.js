import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecoveryPage from './pages/RecoveryPage';
import TipoServicoPage from './pages/TipoServicoPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/tipo-servico" element={<TipoServicoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

