// @ts-ignore
import React from 'react';
import { AlertType } from '../enums/AlertBoxTypes';
import api from '../services/api'
import axios from 'axios'
// @ts-ignore
import { useState } from 'react';
import '../styles/signup.css'
import {
    Link
    // @ts-ignore
} from "react-router-dom";

export default function SignUp(props) {

    // @ts-ignore
    const [username, setusername] = useState('')
    // @ts-ignore
    const [email, setemail] = useState('')
    // @ts-ignore
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    // @ts-ignore
    const [pwd, setpwd] = useState('')
    const [pwd2, setpwd2] = useState('')

    const register = async () => {
        let data = {
            username: username,
            email: email,
            first_name: firstname,
            last_name: lastname,
            password: pwd
        }
        if (validate()) {
            let res = await axios.post("http://127.0.0.1:8000/api/register", data);
            let body = res.data;
            console.log(body);
        }
    }
    function validate() {
        if (username.length == 0) {
            props.showAlert("Username field cannot be blank", AlertType.danger)
            return false
        }
        if (lastname.length == 0) {
            props.showAlert("Last Name field cannot be blank", AlertType.danger)
            return false
        }
        if (firstname.length == 0) {
            props.showAlert("First Name field cannot be blank", AlertType.danger)
            return false
        }
        if (email.length == 0) {
            props.showAlert("Email field cannot be blank", AlertType.danger)
            return false
        }
        if (pwd.length == 0) {
            props.showAlert("Password field cannot be blank", AlertType.danger)
            return false
        }

        return true
    }
    return (

        <div className="mask d-flex align-items-center h-100">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card" style={{ borderRadius: "15px" }} >
                            <div className="card-body p-5">
                                <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                <form>

                                    <div className="form-outline mb-4">
                                        <input type="text" value={username} onChange={(e) => setusername(e.target.value)} id="form3Example1cg" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form3Example1cg">Username</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} id="form3Example1cg" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form3Example1cg">First Name</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} id="form3Example1cg" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form3Example1cg">Last Name</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} id="form3Example3cg" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" value={pwd} onChange={(e) => setpwd(e.target.value)} id="form3Example4cg" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="form3Example4cdg" value={pwd2} onChange={(e) => setpwd2(e.target.value)} className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                    </div>



                                    <div className="d-flex justify-content-center">
                                        <button type="button"
                                            className="btn btn-success btn-block btn-lg text-light" onClick={register}>Register</button>
                                    </div>

                                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/"
                                        className="fw-bold text-body"><u>Login here</u></Link></p>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
