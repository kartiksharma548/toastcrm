import React from 'react'
import auth from '../services/auth'
import { useState,useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    let Comp=props.cmp
    const navigate=useNavigate();
    useEffect(() => {
       console.log('On It');
        if (!auth.isAuthenticated()){
           return navigate("/");
        }
     },[]);
  return (
   auth.isAuthenticated() && <Comp showAlert={props.showAlert}/>
  )
}
