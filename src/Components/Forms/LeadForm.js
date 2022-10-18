import React, { useEffect, useState } from 'react'
import '../../styles/leads.css'
import { getStatuses, saveLeadForm } from '../../services/leadService'

export default function LeadForm(props) {
    let { data } = props;
    
    const [lead, setlead] = useState(data.lead)
    const [statusArr, setstatusArr] = useState([])

    useEffect(() => {
        loadStatuses();
        console.log(data.readOnlyForm)
        if (data.readOnlyForm) {
            var form = document.getElementById('leadForm');
            var elements = form.elements;
            for (var i = 0, len = elements.length; i < len; ++i) {
                elements[i].disabled = true;
            }
        }



    }, [])

    const loadStatuses = async () => {
        let data = await getStatuses();

        setstatusArr(data.data);
    }

    const handleChange = (e) => {
        console.log({ ...lead, [e.target.name]: e.target.value })
        setlead({ ...lead, [e.target.name]: e.target.value })
    }

    const handleStatusChange = (e) => {
        let status = statusArr.find((x) => { return e.target.value == x.status_id });



        setlead({ ...lead, ['status']: { ...status } });
    }

    const saveForm = async () => {


        // delete lead.status;

        // lead.status = status_id;

        let data = {
            ...lead
        };



        let response = await saveLeadForm(data, lead.lead_id);
        if (response.data) {
            props.handleClose(true)
        }
    }

    return (

        <div style={{ width: '1202px' }}>
            <form id="leadForm">
                <div className="row row-spacing">
                    <div className="col">
                        <label >First Name</label>
                        <input type="text" name='first_name' className="form-control" value={lead.first_name} onChange={handleChange} placeholder="First name" />
                    </div>
                    <div className="col">
                        <label >Last Name</label>
                        <input type="text" name='last_name' className="form-control" value={lead.last_name} onChange={handleChange} placeholder="Last name" />
                    </div>
                </div>
                <div className="row row-spacing">
                    <div className="col">
                        <label >State</label>
                        <input type="text" name='state' className="form-control" value={lead.state} onChange={handleChange} placeholder="State" />
                    </div>
                    <div className="col">
                        <label >City</label>
                        <input type="text" name='city' className="form-control" value={lead.city} onChange={handleChange} placeholder="City" />
                    </div>
                </div>
                <div className="row row-spacing">
                    <div className="col">
                        <label >Zip</label>
                        <input type="text" name='zip' className="form-control" value={lead.zip} onChange={handleChange} placeholder="Zip" />
                    </div>
                    <div className="col">
                        <label >Phone No.</label>
                        <input type="text" name='phone_number' className="form-control" value={lead.phone_number} onChange={handleChange} placeholder="Phone No." />
                    </div>
                </div>
                <div className="row row-spacing">
                    <div className="col">
                        <label >Address 1</label>
                        <input type="text" name='address1' className="form-control" value={lead.address1} onChange={handleChange} placeholder="Address 1" />
                    </div>

                </div>
                <div className="row row-spacing">
                    <div className="col">
                        <label >Address 2</label>
                        <input type="text" name='address2' className="form-control" value={lead.address2} onChange={handleChange} placeholder="Address 2(optional)" />
                    </div>

                </div>
                <div className="row row-spacing">
                    <div className="col">
                        <label >Date of Birth</label>
                        <input type="date" name='dob' className="form-control" value={lead.dob} onChange={handleChange} placeholder="DOB" />
                    </div>
                    <div className="col">
                        <label >Status</label>
                        <select className="form-control" disabled value={lead.substatus.status.status_id} onChange={handleStatusChange}>
                            {
                                statusArr.map((x) => {
                                    return <option key={x.status_id} value={x.status_id}>{x.status_name}</option>
                                })}

                        </select>
                        {/* <input type="text" name='status_name' className="form-control" value={lead.status.status_name} onChange={handleChange} placeholder="Status" /> */}
                    </div>
                </div>

            </form>
            {
             !data.readOnlyForm && <div className='d-flex justify-content-end row-spacing'>
                    <button className='btn btn-success mx-2' onClick={saveForm}>Save</button>
                    <button className='btn btn-warning mx-2' onClick={() => { props.handleClose(true) }}>Close</button>
                </div>
            }

        </div>
    )
}
