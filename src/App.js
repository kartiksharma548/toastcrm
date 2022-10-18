// @ts-ignore

import React, { useState } from 'react';
import './App.css';
// @ts-ignore
import Login from './Components/login';
// @ts-ignore
import NavBar from './Components/NavBar';
// @ts-ignore
import SignUp from './Components/SignUp';
// @ts-ignore
import Leads from './Components/Leads';
// @ts-ignore
import Alert from './Components/Alert';
// @ts-ignore
import Dashboard from './Components/Dashboard';

import Profile from './Components/Forms/Profile';
// @ts-ignore
import ProtectedRoute from './Components/ProtectedRoute';
// @ts-ignore
import auth from './services/auth';
// @ts-ignore
import { LoginState } from './contexts/LoginContext'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // @ts-ignore
  Link
  // @ts-ignore
} from "react-router-dom";



function App() {

  const [alertMsg, setalert] = useState(null)
  // @ts-ignore
  const [isAuthenticated, setisAuthenticated] = useState(false)

  // @ts-ignore
  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  // @ts-ignore
  const changeAuthentication = (val) => {
    
    setisAuthenticated(val);
  }

  // @ts-ignore
  document.body.style = 'background: white';

  return (
    <LoginState>
      {auth.isAuthenticated() ? <Router>
        <NavBar changeAuthentication={changeAuthentication}>
          <Alert alert={alertMsg} />
          <Routes>



            <Route path="signup" element={<SignUp showAlert={showAlert} />} />
            <Route path="dashboard" element={<ProtectedRoute cmp={Dashboard} />} />
            <Route path="leads" element={<ProtectedRoute cmp={Leads} />} />
            <Route path="profile" element={<ProtectedRoute cmp={Profile}  showAlert={showAlert}/>} />
            <Route path="/" element={<Login />} />



          </Routes>
        </NavBar >

      </Router> : 
      <Router>
        <Alert alert={alertMsg} />
        <Routes>



          <Route path="signup" element={<SignUp showAlert={showAlert} />} />
          <Route path="dashboard" element={<ProtectedRoute cmp={Dashboard} />} />
          <Route path="leads" element={<ProtectedRoute cmp={Leads} />} />
          <Route path="profile" element={<ProtectedRoute cmp={Profile} showAlert={showAlert}/>} />
          <Route path="/" element={<Login changeAuthenticationFn={changeAuthentication} />} />



        </Routes>
      </Router>
      }
    </LoginState>



  );
}

export default App;
