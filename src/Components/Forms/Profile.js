import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../constants'
import localService from '../../services/local.service'
import { updateUserProfile } from '../../services/leadService'
import { AlertType } from '../../enums/AlertBoxTypes';

export default function Profile(props) {

    let user = JSON.parse(localService.get('user'))
    const first_name = useRef(user.first_name);
    const last_name = useRef(user.last_name);

    

    const [statePic, setstatePic] = useState()
    const [picture, setpicture] = useState();



    const updateProfile = async () => {
        const form = new FormData();
        form.append('first_name', first_name.current.value);
        form.append('last_name', last_name.current.value);

        if (typeof picture != 'string' && picture != undefined)
            form.append('picture', picture)

        const response = await updateUserProfile(user.id, form);
        if (response.status == 200) {
            props.showAlert("Profile updated successfully!",AlertType.success)
            localService.set('user', JSON.stringify(response.data) );
            user=JSON.parse(localService.get('user'))
            setProfileData(true);
        }

    }


    useEffect(() => {
        setProfileData(false)
        return () => {

        }
    }, [])

    const setProfileData = (emptyPic) => {
        first_name.current.value = user.first_name;
        last_name.current.value = user.last_name;
        if(emptyPic)
        setpicture('')
        setstatePic(user.picture);
    }

    return (
        <div className="container">
            <h1>Edit Profile</h1>
            <hr />
            <div className="row">

                <div className="col-md-3">
                    <div className="text-center">
                        <img src={API_URL + statePic} className="avatar img-circle" alt="avatar" />
                        <br/><br/>

                        <input type="file" onChange={(e) => setpicture(e.target.files[0])} className="form-control" />
                    </div>
                </div>


                <div className="col-md-9 personal-info">

                    <h3>Personal info</h3>

                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="col-lg-3 control-label">First name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" name='first_name' ref={first_name} type="text" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label">Last name:</label>
                            <div className="col-lg-8">
                                <input className="form-control" name='last_name' ref={last_name} type="text" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-3 control-label">Email:</label>
                            <div className="col-lg-8">
                                <input className="form-control" name='email' type="text" disabled value={user.email} />
                            </div>
                        </div>

                        {/* <div className="form-group">
                            <label className="col-md-3 control-label">Username:</label>
                            <div className="col-md-8">
                                <input className="form-control" type="text" disabled value={"janeuser"} />
                            </div>
                        </div> */}
                        {/* <div className="form-group">
                                    <label className="col-md-3 control-label">Password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value="11111122333" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Confirm password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value="11111122333" />
                                    </div>
                                </div> */}
                        <div className="form-group">
                            <label className="col-md-3 control-label"></label>
                            <div className="col-md-8">
                                <button type="button" className="btn btn-primary" onClick={updateProfile}  >Save Changes</button>
                                <span></span>
                                <input type="reset" className="btn btn-default" value="Cancel" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
