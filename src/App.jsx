
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

// Components
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import AdminOpretTour from './pages/admin/AdminOpretTour';
import AdminRetTour from './pages/admin/AdminRetTour';
import AdminTour from './pages/admin/AdminTour';
import AdminAbout from './pages/admin/AdminAbout'
import AdminKontakt from './pages/admin/AdminKontakt';
import Login from './pages/Login';
import AdminFooter from './pages/admin/AdminFooter';

// Context-provider er en "global state" med en login funktion
import LoginContextProvider from "./context/LoginContext";


function App () {
  return (
    <div className="App outer-container">

      <LoginContextProvider>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />



          {/* ADMIN-routes  */ }
          <Route path="/admin" element={ <AdminLayout /> } >
            <Route path="home" index element={ <AdminHome /> } />
            <Route path="adminAbout" element={ <AdminAbout /> } />
            <Route path="AdminTour" element={ <AdminTour /> } />
            <Route path="adminOpretTour" element={ <AdminOpretTour /> } />
            <Route path="adminRetTour/:id" element={ <AdminRetTour /> } />
            <Route path="adminSeKontakt" element={ <AdminKontakt /> } />
            <Route path="adminSeFooter" element={ <AdminFooter /> } />
            <Route path="*" element={ <NoMatch /> } />
          </Route>

        </Routes>
      </LoginContextProvider>
    </div>
  );
}

export default App;