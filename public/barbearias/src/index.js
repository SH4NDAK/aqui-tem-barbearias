import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecoveryPage from './pages/RecoveryPage';
import TipoServicoPage from './pages/TipoServicoPage';
import TipoServicoFormPage from './pages/TipoServicoFormPage';
import AgendaPage from './pages/AgendaPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/tipo-servico" element={<TipoServicoPage />} />
        <Route path="/tipo-servico/new" element={<TipoServicoFormPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

