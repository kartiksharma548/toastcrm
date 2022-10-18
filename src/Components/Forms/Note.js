// @ts-nocheck
import React, { useState, useEffect } from 'react'
import '../../styles/basics.css'
import { saveNote, updateNote, getSubStatuses, saveSchedule, updateSchedule, getCancelledStatuses } from '../../services/leadService'
import { formatDate } from '../../services/utilities';
import { useSelector } from 'react-redux';

export default function Note(props) {

    const data = props.data;
    const [lead, setlead] = useState(data.lead)
    const [substatus, setsubstatus] = useState('')
    const [selectedsubstatus, setselectedsetsubstatus] = useState('')
    const [hideDate, sethideDate] = useState(false)

    const sch = useSelector(state => state.schedule);

    const [statuses, setstatuses] = useState([]);
    const [cancelledStatuses, setcancelledStatuses] = useState([]);
    const [mode, setmode] = useState(data.mode)
    const [note, setnote] = useState({ note: '', subject: '', lead_id: lead.lead_id })
    const [schedule, setschedule] = useState({ schedule_dateTime: formatDate(new Date()), time: '09:00', durationHr: 0, durationMin: 30, alarm: '15', location: data.lead.address1, message: '', subject: data.status != undefined ? data.status : '', lead_id: data.lead.lead_id, isCompleted: false, isCancelled: false })
    const handleChange = (e) => {


        if (mode == 'C') {
            setschedule({ ...schedule, [e.target.name]: e.target.value })
        }
        else
            setnote({ ...note, [e.target.name]: e.target.value })
    }
    const getSubStatusesFn = async () => {

        let obj = {
            cancellationStatuses: mode == 'CA' ? '1' : '0'
        }
        let response = await getSubStatuses(data.lead.substatus.sub_status_id, obj);
        if (response.data[0].status.status_id_name == "STATUS_LOST")
            sethideDate(true)

        setselectedsetsubstatus(response.data[0]);
        setsubstatus(response.data[0]['sub_status_id'])
        setstatuses(response.data)
    }

    const getCancelledStatusesFn = async () => {


        let response = await getCancelledStatuses();
        setcancelledStatuses(response.data)

    }
    const saveNoteFn = async () => {
        if (mode == 'N' || mode == 'C' || mode == 'CA') {
            if (mode == 'C' || mode == 'CA') {
                let time = schedule.time;
                schedule.schedule_dateTime = schedule.schedule_dateTime + ' ' + time;
                delete schedule.time;

                if (selectedsubstatus.status.status_id_name != 'STATUS_LOST' && selectedsubstatus.status.status_id_name != 'STATUS_CLIENT') {
                    let response = await saveSchedule(schedule);
                    if (response.status == 201) {
                        if (mode == 'C')
                            sch.isCompleted = true
                        if (mode == 'CA')
                            sch.isCancelled = true
                        let response = await updateSchedule(sch, sch.schedule_id);
                        if (response.status != 201)
                            return;
                    }
                }
                else {


                    if (mode == 'C')
                        schedule.isCompleted = true
                    if (mode == 'CA')
                        schedule.isCancelled = true
                    let updatedSchedule = { ...sch }
                    updatedSchedule = { ...schedule }
                    let response = await updateSchedule(updatedSchedule, updatedSchedule.schedule_id);
                    if (response.status != 201)
                        return;
                }



            }
            let noteObj = { ...note };
            if (mode == 'C' || mode == 'CA') {
                noteObj.note = `Status Changed from ${data.lead.substatus.sub_status_name} to ${selectedsubstatus.sub_status_name}`;
                noteObj.subject = 'Appointment';
            }

            const response = await saveNote(noteObj)
            if (response.status == 200)
                if (mode == 'C' || mode == 'CA')
                    props.handleClose(selectedsubstatus)
                else
                    props.handleClose(true)
        }
        if (mode == 'E') {
            delete note.lead

            const response = await updateNote(note, note.note_id)
            if (response.status == 200)
                props.handleClose(true)
        }

    }

    useEffect(() => {

        if (mode == 'C' || mode == 'CA')
            getSubStatusesFn();
        if (mode == 'CA')
            getCancelledStatusesFn()
        if (mode == 'E') {
            setnote({ ...note, ...data.note });


        }
        if (mode == 'C' || mode == 'CA') {
            let schObj = { ...sch };
            schedule.time = schObj.schedule_dateTime.split(' ')[1];
            schObj.schedule_dateTime = schObj.schedule_dateTime.split(' ')[0];
            schObj.message = 'Status Changed';
            schObj.time = schedule.time;
            setschedule({ ...schedule, ...schObj });
        }

        return () => {


        }
    }, [])
    const handleStatusChange = (e) => {
        setsubstatus(parseInt(e.target.value))
        let selectedSubStatus = statuses.find((x) => x.sub_status_id == parseInt(e.target.value))
        if (selectedSubStatus == undefined)
            selectedSubStatus = cancelledStatuses.find((x) => x.sub_status_id == parseInt(e.target.value))
        if (selectedSubStatus.status.status_id_name == "STATUS_LOST" || selectedSubStatus.status.status_id_name == "STATUS_CLIENT")
            sethideDate(true)
        else
            sethideDate(false)
        setselectedsetsubstatus(selectedSubStatus);
    }
    const handleScheduleChange = (e) => {
        setschedule({ ...schedule, [e.target.name]: e.target.value })
    }
    return (
        <div className="py-3" style={{ width: '600px' }}>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Subject</label>
                <div className="col-sm-10">
                    {(data.lead.substatus.status.status_id_name == "STATUS_APP" && (data.mode == 'C' || data.mode == 'CA')) ? <input type="text" onChange={handleChange} value={schedule.subject} className="form-control" name="subject" id="staticEmail" /> : <input type="text" onChange={handleChange} value={note.subject} className="form-control" name="subject" id="staticEmail" />}
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelStyle">Note</label>
            </div>
            <div className="mb-3 row">

                <div className="col-sm-12">
                    {(data.lead.substatus.status.status_id_name == "STATUS_APP" && (data.mode == 'C' || data.mode == 'CA')) ? <textarea className="form-control" rows="4" value={schedule.message} onChange={handleChange} name="message" id="inputPassword"></textarea> : <textarea className="form-control" rows="4" value={note.note} onChange={handleChange} name="note" id="inputPassword"></textarea>}
                </div>
            </div>
            {
                (data.lead.substatus.status.status_id_name == "STATUS_APP" && (data.mode == 'C' || data.mode == 'CA')) && <>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Status</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="substatus" value={substatus} onChange={handleStatusChange}>
                                {
                                    statuses.map((x) => {
                                        return <option key={x.sub_status_id} value={x.sub_status_id}>{x.sub_status_name}</option>
                                    })


                                }
                                {
                                    data.mode == 'CA' && cancelledStatuses.map((x) => {
                                        return <option key={x.sub_status_id} value={x.sub_status_id}>{x.sub_status_name}</option>
                                    })
                                }

                            </select>
                        </div>
                    </div>


                    {!hideDate && <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Date</label>
                        <div className="col-sm-4">
                            <input type="date" onChange={handleScheduleChange} value={schedule.schedule_dateTime} className="form-control" name="schedule_dateTime" id="staticEmail" />
                        </div>
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Time</label>
                        <div className="col-sm-4">

                            <select className="form-control" onChange={handleScheduleChange} value={schedule.time} name="time"><option value="07:00">07:00 AM</option><option value="07:15">07:15 AM</option><option value="07:30">07:30 AM</option><option value="07:45">07:45 AM</option><option value="08:00">08:00 AM</option><option value="08:15">08:15 AM</option><option value="08:30">08:30 AM</option><option value="08:45">08:45 AM</option><option value="09:00">09:00 AM</option><option value="09:15">09:15 AM</option><option value="09:30">09:30 AM</option><option value="09:45">09:45 AM</option><option value="10:00">10:00 AM</option><option value="10:15">10:15 AM</option><option value="10:30">10:30 AM</option><option value="10:45">10:45 AM</option><option value="11:00">11:00 AM</option><option value="11:15">11:15 AM</option><option value="11:30">11:30 AM</option><option value="11:45">11:45 AM</option><option value="12:00">12:00 PM</option><option value="12:15">12:15 PM</option><option value="12:30">12:30 PM</option><option value="12:45">12:45 PM</option><option value="13:00">01:00 PM</option><option value="13:15">01:15 PM</option><option value="13:30">01:30 PM</option><option value="13:45">01:45 PM</option><option value="14:00">02:00 PM</option><option value="14:15">02:15 PM</option><option value="14:30">02:30 PM</option><option value="14:45">02:45 PM</option><option value="15:00">03:00 PM</option><option value="15:15">03:15 PM</option><option value="15:30">03:30 PM</option><option value="15:45">03:45 PM</option><option value="16:00">04:00 PM</option><option value="16:15">04:15 PM</option><option value="16:30">04:30 PM</option><option value="16:45">04:45 PM</option><option value="17:00">05:00 PM</option><option value="17:15">05:15 PM</option><option value="17:30">05:30 PM</option><option value="17:45">05:45 PM</option><option value="18:00">06:00 PM</option><option value="18:15">06:15 PM</option><option value="18:30">06:30 PM</option><option value="18:45">06:45 PM</option><option value="19:00">07:00 PM</option><option value="19:15">07:15 PM</option><option value="19:30">07:30 PM</option><option value="19:45">07:45 PM</option><option value="20:00">08:00 PM</option><option value="20:15">08:15 PM</option><option value="20:30">08:30 PM</option><option value="20:45">08:45 PM</option><option value="21:00">09:00 PM</option></select>
                        </div >
                    </div >}
                </>
            }

            <div className='d-flex justify-content-end row-spacing'>
                <button className='btn btn-success mx-2' onClick={saveNoteFn}>{mode == 'E' ? 'Update' : 'Save'}</button>
                <button className='btn btn-warning mx-2' onClick={() => { props.handleClose(false) }}>Close</button>
            </div>
        </div>


    )
}
