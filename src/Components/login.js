// @ts-ignore
import React from 'react'
// @ts-ignore
import { useState,useEffect,useContext } from 'react';
// @ts-ignore
import axios from "axios";
// @ts-ignore
import LocalService from '../services/local.service';
// @ts-ignore
import api from '../services/api'
// @ts-ignore
import auth from '../services/auth'
import {
  Link
// @ts-ignore
} from "react-router-dom";
// @ts-ignore
import { useNavigate } from "react-router-dom";
// @ts-ignore
import {LoginContext} from '../contexts/LoginContext'


// @ts-ignore
export default function Login(props) {

  // @ts-ignore
  const {updateUser} = useContext(LoginContext)

  const style = {

    marginTop: '100px'
  }
  
  const navigate = useNavigate();
  const [username, setusername] = useState('')
  const [pwd, setpwd] = useState('')
  // @ts-ignore
  const [data, setdata] = useState(null)
  
  const loginUser = async () => {
    try {
      const config = {
        headers: { "content-type": "application/json" }
      }
      axios.post("http://127.0.0.1:8000/api/login/", {
        'email': username, 'password': pwd

      // @ts-ignore
      }, config).then((response) => {
        //console.log(response.data.access)
        LocalService.set("token", response.data.access);
       
        updateUser(response.data.user)
   
        LocalService.set("user", JSON.stringify(response.data.user));
        props.changeAuthenticationFn(true)
        
        navigate('dashboard')
        //getData(response.data.access);
      });

      
    } catch (error) {

    }

  }
  useEffect(() => {
   
    if (auth.isAuthenticated()){
       return navigate("/dashboard");
    }
    // @ts-ignore
    document.body.style = 'background: rgb(195,166,15)';
  // @ts-ignore
  document.body.style = 'background: radial-gradient(circle, rgba(195,166,15,1) 1%, rgba(255,231,114,1) 35%);';
 },[]);
  return (
    <section>
      <div className='container my-2 h-100'>
        <div className='card h-100 w-50 mx-auto' style={style}>
          <div style={{overflow:"hidden",width:"100%",textAlign:"center"}}>
            <img src="toastcrmLogo.jpg" style={{height:"180px"}}/>
          </div>
          <div className='card-body'>
            <form>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-8'>
                  <div className="input-group flex-nowrap mb-4">
                    <span className="input-group-text" id="addon-wrapping"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg></span>
                    <input type="text" id="form2Example1" value={username} placeholder="Username" className="form-control" onChange={(e) => setusername(e.target.
// @ts-ignore
                    value)} />

                  </div>
                </div>
              </div>

              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-8'>
                  <div className="input-group flex-nowrap mb-4">
                    <span className="input-group-text" id="addon-wrapping"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg></span>
                    <input type="password" id="form2Example2" value={pwd} placeholder="Password" className="form-control" onChange={(e) => setpwd(e.target.
// @ts-ignore
                    value)} />

                  </div>
                </div>
              </div>





              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-8'>
                  <div className="form-outline mb-4">
                    <button type="button" onClick={loginUser} className="btn btn-primary btn-block mb-4 w-100">Login</button>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-8'>
                  <p className="text-center text-muted mb-0">Not a registered user? <Link to="/signup"
                    className="fw-bold text-body"><u>Register Here</u></Link></p>
                </div>
              </div>




            </form>
          </div>
        </div>


      </div>
    </section>


  )
}
