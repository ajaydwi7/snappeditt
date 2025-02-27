import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Invoice from './pages/Invoice';
import ShopPage from './pages/Shop';
import ServiceEditForm from "./pages/ServiceEditForm";


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path='/customers' element={<Customers />} />
        <Route exact path='/orders' element={<Orders />} />
        <Route exact path='/invoice' element={<Invoice />} />
        <Route exact path='/services' element={<ShopPage />} />
        <Route exact path='/add-services' element={<ServiceEditForm />} />
      </Routes>
    </>
  );
}

export default App;
