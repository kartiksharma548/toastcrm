// @ts-ignore
import React, { useEffect, useState } from 'react'
// @ts-ignore
import localService from '../services/local.service'
// @ts-ignore
import auth from '../services/auth';
// @ts-ignore
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/navbar.css';
import {
    Link
    // @ts-ignore
} from "react-router-dom";

// @ts-ignore
export default function NavBar(props) {
    let user = JSON.parse(localService.get('user'));


    const [activeLink, setactiveLink] = useState(-1)
    const pageArray = ['dashboard', 'leads', 'clients', 'settings','profile']
    const navigate = useNavigate();
    const location = useLocation();
    // @ts-ignore
    const handleLogout = () => {
        auth.logout();
        props.changeAuthentication(false)
        navigate('/');
    }

    useEffect(() => {
        let path = location.pathname.slice(1);
        let index = pageArray.findIndex((x) => x == path);
        setactiveLink(index);
    }, [])
    return (


        <>
            <header>

                <nav
                    id="sidebarMenu"
                    className="collapse d-lg-block sidebar-left collapse"
                >
                    <div className="position-sticky">
                        <div className='d-flex flex-column'></div>
                        <div className="list-group list-group-flush mx-3 mt-5">

                            <ul
                                id="collapseExample1"
                                className="collapse show list-group list-group-flush"
                            >
                                <li onClick={() => setactiveLink(0)} className={`list-group-item py-2 d-flex align-items-center ${activeLink == 0 ? 'activeLink' : ''}`}>

                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48 48" style={{ enableBackground: "new 0 0 48 48" }} xmlSpace="preserve">

                                        <path className="st0" d="M25.5,19.5V6H42v13.5H25.5z M6,25.5V6h16.5v19.5H6z M25.5,42V22.5H42V42H25.5z M6,42V28.5h16.5V42H6z M9,22.5
	h10.5V9H9V22.5z M28.5,39H39V25.5H28.5V39z M28.5,16.5H39V9H28.5V16.5z M9,39h10.5v-7.5H9V39z"/>
                                    </svg>&nbsp;
                                    <Link to="dashboard" className="text-light" style={{ textDecoration: 'none' }}>Dashboard</Link>
                                </li>
                                <li onClick={() => setactiveLink(1)} className={`list-group-item py-2 ${activeLink == 1 ? 'activeLink' : ''}`}>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48 48" style={{ enableBackground: "new 0 0 48 48" }} xmlSpace="preserve">

                                        <path className="st0" d="M7.2,46v-3h33.6v3H7.2z M7.2,5V2h33.6v3H7.2z M24,25.8c1.7,0,3.1-0.6,4.2-1.7c1.1-1.1,1.7-2.5,1.7-4.2
	c0-1.7-0.6-3.1-1.7-4.2C27.1,14.6,25.7,14,24,14s-3.1,0.6-4.2,1.7s-1.7,2.5-1.7,4.2c0,1.7,0.6,3.1,1.7,4.2S22.3,25.8,24,25.8z
	 M6.6,40c-0.8,0-1.5-0.3-2.1-0.9S3.6,37.8,3.6,37V11c0-0.9,0.3-1.6,0.9-2.1S5.8,8,6.6,8h34.8c0.8,0,1.5,0.3,2.1,0.9s0.9,1.3,0.9,2.1
	v26c0,0.8-0.3,1.5-0.9,2.1c-0.6,0.6-1.3,0.9-2.1,0.9H6.6z M11,37c1.7-2.1,3.7-3.7,6-4.7c2.3-1.1,4.6-1.6,7-1.6c2.3,0,4.6,0.5,7,1.6
	c2.4,1,4.4,2.6,6,4.7h4.4V11H6.6v26H11z M15.7,37h16.7c-1-1-2.2-1.8-3.6-2.4s-3-0.9-4.8-0.9s-3.4,0.3-4.7,0.9S16.7,36,15.7,37z
	 M24,22.8c-0.8,0-1.5-0.3-2-0.9c-0.5-0.6-0.8-1.3-0.8-2c0-0.8,0.3-1.5,0.8-2c0.5-0.6,1.2-0.9,2-0.9s1.5,0.3,2,0.9
	c0.5,0.6,0.8,1.3,0.8,2s-0.3,1.5-0.8,2C25.5,22.5,24.8,22.8,24,22.8z"/>
                                    </svg>&nbsp;

                                    <Link to="leads" className="text-light" style={{ textDecoration: 'none' }}>Leads</Link>
                                </li>
                                {/* <li onClick={()=>setactiveLink(2)} className={`list-group-item py-2 ${activeLink==2?'activeLink':''}`}>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48 48" style={{ enableBackground: "new 0 0 48 48" }} xmlSpace="preserve">

                                        <path className="st0" d="M24,23.9c-2.2,0-4-0.7-5.4-2.1c-1.4-1.4-2.1-3.2-2.1-5.4s0.7-4,2.1-5.4C20,9.6,21.8,8.9,24,8.9s4,0.7,5.4,2.1
	c1.4,1.4,2.1,3.2,2.1,5.4s-0.7,4-2.1,5.4C28,23.2,26.2,23.9,24,23.9z M8,40v-4.7C8,34,8.3,32.9,8.9,32c0.6-0.9,1.4-1.6,2.4-2
	c2.2-1,4.4-1.8,6.4-2.3S21.9,27,24,27s4.1,0.3,6.1,0.8s4.2,1.3,6.4,2.2c1,0.5,1.9,1.1,2.5,2c0.6,0.9,1,2,1,3.3V40H8z M11,37h26v-1.7
	c0-0.5-0.2-1-0.5-1.5c-0.3-0.5-0.7-0.8-1.2-1.1c-2.1-1-4.1-1.7-5.9-2.1C27.7,30.2,25.9,30,24,30s-3.8,0.2-5.5,0.6
	c-1.8,0.4-3.8,1.1-5.9,2.1c-0.5,0.2-0.9,0.6-1.1,1.1c-0.3,0.5-0.5,1-0.5,1.5V37z M24,20.9c1.3,0,2.4-0.4,3.2-1.3
	c0.8-0.9,1.3-1.9,1.3-3.2s-0.4-2.4-1.3-3.2c-0.9-0.9-1.9-1.3-3.2-1.3s-2.4,0.4-3.2,1.3c-0.8,0.9-1.3,1.9-1.3,3.2
	c0,1.3,0.4,2.4,1.3,3.2C21.6,20.5,22.7,20.9,24,20.9z"/>
                                    </svg>&nbsp;
                                    <Link to="/" className="text-light" style={{ textDecoration: 'none' }}>Clients</Link>
                                </li>
                                <li onClick={()=>setactiveLink(3)} className={`list-group-item py-2 ${activeLink==3?'activeLink':''}`}>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48 48" style={{ enableBackground: "new 0 0 48 48" }} xmlSpace="preserve">

                                        <path className="st0" d="M18,34.7h11.5c0.5,0,0.9-0.1,1.2-0.3s0.6-0.5,0.8-0.9l3.9-9.1c0.1-0.2,0.1-0.4,0.2-0.8c0-0.3,0.1-0.6,0.1-0.8
	v-1.2c0-0.5-0.1-0.8-0.3-1s-0.6-0.3-1-0.3H23.6l1.5-6.9c0.1-0.3,0.1-0.5,0-0.8c-0.1-0.2-0.2-0.4-0.4-0.6L23.6,11l-8.1,8.7l-0.4,0.8
	C15.1,20.8,15,21,15,21.3v10.4c0,0.8,0.3,1.5,0.9,2.1C16.5,34.4,17.2,34.7,18,34.7z M24,44c-2.7,0-5.3-0.5-7.8-1.6
	c-2.4-1-4.6-2.5-6.4-4.3s-3.3-3.9-4.3-6.4S4,26.7,4,24c0-2.8,0.5-5.4,1.6-7.8s2.5-4.5,4.3-6.3s3.9-3.2,6.4-4.3S21.3,4,24,4
	c2.8,0,5.4,0.5,7.8,1.6s4.6,2.5,6.3,4.3c1.8,1.8,3.2,3.9,4.3,6.3c1.1,2.4,1.6,5,1.6,7.8c0,2.7-0.5,5.3-1.6,7.8
	c-1,2.4-2.5,4.6-4.3,6.4c-1.8,1.8-3.9,3.3-6.4,4.3C29.4,43.5,26.8,44,24,44z M24,41c4.7,0,8.8-1.7,12-5c3.3-3.3,5-7.3,5-12
	c0-4.7-1.6-8.7-5-12C32.8,8.6,28.7,7,24,7c-4.7,0-8.7,1.7-12,4.9s-5,7.3-5,12c0,4.7,1.7,8.7,5,12C15.3,39.3,19.3,41,24,41z"/>
                                    </svg>&nbsp;

                                    <Link to="" className="text-light" style={{ textDecoration: 'none' }}>Prospects</Link>
                                </li> */}

                                <li onClick={() => setactiveLink(4)} className={`list-group-item py-2 ${activeLink == 4 ? 'activeLink' : ''}`}>
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48 48" style={{ enableBackground: "new 0 0 48 48" }} xmlSpace="preserve">

                                        <path className="st0" d="M24,23.9c-2.2,0-4-0.7-5.4-2.1c-1.4-1.4-2.1-3.2-2.1-5.4s0.7-4,2.1-5.4C20,9.6,21.8,8.9,24,8.9s4,0.7,5.4,2.1
	c1.4,1.4,2.1,3.2,2.1,5.4s-0.7,4-2.1,5.4C28,23.2,26.2,23.9,24,23.9z M8,40v-4.7C8,34,8.3,32.9,8.9,32c0.6-0.9,1.4-1.6,2.4-2
	c2.2-1,4.4-1.8,6.4-2.3S21.9,27,24,27s4.1,0.3,6.1,0.8s4.2,1.3,6.4,2.2c1,0.5,1.9,1.1,2.5,2c0.6,0.9,1,2,1,3.3V40H8z M11,37h26v-1.7
	c0-0.5-0.2-1-0.5-1.5c-0.3-0.5-0.7-0.8-1.2-1.1c-2.1-1-4.1-1.7-5.9-2.1C27.7,30.2,25.9,30,24,30s-3.8,0.2-5.5,0.6
	c-1.8,0.4-3.8,1.1-5.9,2.1c-0.5,0.2-0.9,0.6-1.1,1.1c-0.3,0.5-0.5,1-0.5,1.5V37z M24,20.9c1.3,0,2.4-0.4,3.2-1.3
	c0.8-0.9,1.3-1.9,1.3-3.2s-0.4-2.4-1.3-3.2c-0.9-0.9-1.9-1.3-3.2-1.3s-2.4,0.4-3.2,1.3c-0.8,0.9-1.3,1.9-1.3,3.2
	c0,1.3,0.4,2.4,1.3,3.2C21.6,20.5,22.7,20.9,24,20.9z"/>
                                    </svg>&nbsp;
                                    <Link to="profile" className="text-light" style={{ textDecoration: 'none' }}>Profile</Link>
                                </li>


                            </ul>

                            <ul
                                id="collapseExample2"
                                className="collapse list-group list-group-flush"
                            >
                                <li className="list-group-item py-1">
                                    <a href="" className="text-reset">Link</a>
                                </li>
                                <li className="list-group-item py-1">
                                    <a href="" className="text-reset">Link</a>
                                </li>
                                <li className="list-group-item py-1">
                                    <a href="" className="text-reset">Link</a>
                                </li>
                                <li className="list-group-item py-1">
                                    <a href="" className="text-reset">Link</a>
                                </li>
                            </ul>
                        </div>
                        <div className="list-group list-group-flush mx-3 mb-5 " style={{ bottom: '0px', position: 'fixed' }}>
                            <ul
                                id="collapseExample1"
                                className="collapse show list-group list-group-flush"
                            >
                                <li className="list-group-item py-2 d-flex align-items-center">

                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 48 48" style={{ enableBackground: "new 0 0 48 48" }} xmlSpace="preserve">

                                        <path className="st0" d="M9,42c-0.8,0-1.5-0.3-2.1-0.9C6.3,40.5,6,39.8,6,39V9c0-0.8,0.3-1.5,0.9-2.1S8.2,6,9,6h14.5v3H9v30h14.5v3H9z
	 M33.3,32.7l-2.1-2.1l5.1-5.1H18.8v-3h17.4l-5.1-5.1l2.1-2.1L42,24L33.3,32.7z"/>
                                    </svg>&nbsp;
                                    <span onClick={handleLogout} className="text-light" style={{ textDecoration: 'none', cursor: 'pointer' }}>Logout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <nav
                    id="main-navbar"
                    className="navbar navbar-expand-lg navbar-light fixed-top"

                >
                    <div className="container-fluid" style={{ height: '50px', paddingLeft: '0px', justifyContent: 'flex-start' }}>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </button>

                        <Link className="navbar-brand" to="/" style={{ opacity: 0.7, marginLeft: '28px' }}>
                            <div>
                                <img
                                    src="toastcrmLogo.jpg"
                                    style={{ height: '50px' }}
                                    alt=""
                                    loading="lazy"
                                />
                            </div>
                        </Link>

                        {
                            user && activeLink != 4 && <div className='d-flex align-items-center' style={{ marginLeft: '80px' }}>
                                <h2>Welcome ,</h2>   <h5 className='pt-2'> &nbsp;  {user.first_name}</h5>
                            </div>
                        }


                    </div>
                </nav>

            </header>

            <main style={{ marginTop:activeLink != 4 ? "58px":'' , marginRight: activeLink == 1 ? '194px' : '' }}>
               {activeLink != 4 && <hr />} 
                <div className="container pt-4">
                    {props.children}
                </div>
            </main>

        </>




    )
}
