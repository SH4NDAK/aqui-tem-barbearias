import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import  router  from './Routes'
import { OtpProvider } from './pages/Otpcontext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OtpProvider>
    <RouterProvider router={router}/>
    </OtpProvider>
  </React.StrictMode>
);

