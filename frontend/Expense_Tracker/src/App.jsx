import React from 'react';

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';


import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/income';
import Expenses from './pages/Dashboard/Expenses';
import { User } from 'lucide-react';
import UserProvider from './context/UserContext';

const App=()=>{
  return(
   <UserProvider> 
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income/>} />
          <Route path="/Expenses" element={<Expenses/>} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}
export default App;

const Root = () => {
  // Replace with your authentication logic
  const isAuthenticated = !!localStorage.getItem("token"); 
  // Redirect to login if not authenticated
   return isAuthenticated ?(
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
   )
}