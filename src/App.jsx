import React, { useState } from 'react';
import PrivateLayout from './layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
// import { UserContext } from 'context/userContext';
import Index from './pages/Index';
import Page2 from './pages/Page2';
import IndexCategory1 from './pages/category1/Index';
import Category1 from './pages/category1/CategoryPage1';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateLayout />}>
          <Route path='' element={<Index />} />
          <Route path='page2' element={<Page2 />} />
          <Route path='category1' element={<IndexCategory1 />} />
          <Route path='category1/page1' element={<Category1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
