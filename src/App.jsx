import React, { useState } from 'react';
import PrivateLayout from './layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import Index from './pages/Index';
import Page2 from './pages/Page2';
import IndexCategory1 from './pages/category1/Index';
import Category1 from './pages/category1/CategoryPage1';
import IndexUsuarios from 'pages/usuarios/Index';
import './styles/globals.css';
import 'styles/tabla.css';
import EditarUsuario from 'pages/usuarios/Editar';

// const httpLink = createHttpLink({
//   uri: "https://server-back-workbot.herokuapp.com/graphql"
// })

const client = new ApolloClient({
  uri: 'https://server-gql-mern.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateLayout />}>
            <Route path='' element={<Index />} />
            <Route path='/usuarios' element={<IndexUsuarios />} />
            <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
            <Route path='page2' element={<Page2 />} />
            <Route path='category1' element={<IndexCategory1 />} />
            <Route path='category1/page1' element={<Category1 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
