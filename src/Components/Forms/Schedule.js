import React, { useState, useEffect } from 'react'
import '../../styles/basics.css'
import { formatDate } from '../../services/utilities';
import { saveSchedule, updateSchedule } from '../../services/leadService'

export default function Schedule(props) {

  let { data } = props;

  // @ts-ignore
  const [schedule, setschedule] = useState({ schedule_dateTime: formatDate(new Date()), time: '09:00', durationHr: 0, durationMin: 30, alarm: '15', location: data.lead.address1, message: '', subject: data.status != undefined ? data.status : '', lead_id: data.lead.lead_id, isCompleted: false, isCancelled: false })
  const [mode, setmode] = useState(data.mode)
  const handleChange = (e) => {
    setschedule({ ...schedule, [e.target.name]: e.target.value })
  }

  const saveScheduleFn = async () => {
    let time = schedule.time;
    schedule.schedule_dateTime = schedule.schedule_dateTime + ' ' + time;
    delete schedule.time;


    if (mode == 'N') {
      let response = await saveSchedule(schedule);
      if (response.status == 201)
        props.handleClose(true)
    }

    if (mode == 'E') {


      const response = await updateSchedule(schedule, schedule.schedule_id)
      if (response.status == 201)
        props.handleClose(true)
    }
  }

  useEffect(() => {
    if (mode == 'E') {

      console.log(data.schedule.schedule_dateTime)
      let schObj = { ...data.schedule };
      schedule.time = schObj.schedule_dateTime.split(' ')[1];
      schObj.schedule_dateTime = schObj.schedule_dateTime.split(' ')[0];

      setschedule({ ...schedule, ...schObj });

    }

    return () => {

    }
  }, [])


  return (
    <div className="py-3" style={{ width: '900px' }}>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Date</label>
        <div className="col-sm-4">
          <input type="date" onChange={handleChange} value={schedule.schedule_dateTime} className="form-control" name="schedule_dateTime" id="staticEmail" />
        </div>
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Time</label>
        <div className="col-sm-4">

          <select className="form-control" onChange={handleChange} value={schedule.time} name="time"><option value="07:00">07:00 AM</option><option value="07:15">07:15 AM</option><option value="07:30">07:30 AM</option><option value="07:45">07:45 AM</option><option value="08:00">08:00 AM</option><option value="08:15">08:15 AM</option><option value="08:30">08:30 AM</option><option value="08:45">08:45 AM</option><option value="09:00">09:00 AM</option><option value="09:15">09:15 AM</option><option value="09:30">09:30 AM</option><option value="09:45">09:45 AM</option><option value="10:00">10:00 AM</option><option value="10:15">10:15 AM</option><option value="10:30">10:30 AM</option><option value="10:45">10:45 AM</option><option value="11:00">11:00 AM</option><option value="11:15">11:15 AM</option><option value="11:30">11:30 AM</option><option value="11:45">11:45 AM</option><option value="12:00">12:00 PM</option><option value="12:15">12:15 PM</option><option value="12:30">12:30 PM</option><option value="12:45">12:45 PM</option><option value="13:00">01:00 PM</option><option value="13:15">01:15 PM</option><option value="13:30">01:30 PM</option><option value="13:45">01:45 PM</option><option value="14:00">02:00 PM</option><option value="14:15">02:15 PM</option><option value="14:30">02:30 PM</option><option value="14:45">02:45 PM</option><option value="15:00">03:00 PM</option><option value="15:15">03:15 PM</option><option value="15:30">03:30 PM</option><option value="15:45">03:45 PM</option><option value="16:00">04:00 PM</option><option value="16:15">04:15 PM</option><option value="16:30">04:30 PM</option><option value="16:45">04:45 PM</option><option value="17:00">05:00 PM</option><option value="17:15">05:15 PM</option><option value="17:30">05:30 PM</option><option value="17:45">05:45 PM</option><option value="18:00">06:00 PM</option><option value="18:15">06:15 PM</option><option value="18:30">06:30 PM</option><option value="18:45">06:45 PM</option><option value="19:00">07:00 PM</option><option value="19:15">07:15 PM</option><option value="19:30">07:30 PM</option><option value="19:45">07:45 PM</option><option value="20:00">08:00 PM</option><option value="20:15">08:15 PM</option><option value="20:30">08:30 PM</option><option value="20:45">08:45 PM</option><option value="21:00">09:00 PM</option></select>
        </div >
      </div >
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Alarm</label>
        <div className="col-sm-4">
          <select className="form-control " onChange={handleChange} value={schedule.alarm} name="alarm"><option value="0">0 Min</option><option value="5">5 Min</option><option value="10">10 Min</option><option value="15" >15 Min</option><option value="30">30 Min</option><option value="45">45 Min</option><option value="60">1 Hour</option><option value="120">2 Hour</option><option value="180">3 Hour</option><option value="240">4 Hour</option><option value="300">5 Hour</option><option value="360">6 Hour</option><option value="420">7 Hour</option><option value="480">8 Hour</option><option value="540">9 Hour</option><option value="600">10 Hour</option></select>
        </div>

        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Duration(hr:min)</label>
        <div className="col-sm-2">
          <select className="form-control" onChange={handleChange} value={schedule.durationHr} name="durationHr"><option value="0">0</option><option value="1" >1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option></select>
        </div>


        <div className="col-sm-2">
          <select className="form-control " onChange={handleChange} value={schedule.durationMin} name="durationMin"> <option value="0" >0</option><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="30">30</option><option value="35">35</option><option value="40">40</option><option value="45">45</option><option value="50">50</option><option value="55">55</option></select>
        </div>

      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Status</label>
        <div className="col-sm-4">
          <input type="text" onChange={handleChange} value={schedule.location} className="form-control" name="location" id="staticEmail" />
        </div>
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Location</label>
        <div className="col-sm-4">
          <input type="text" onChange={handleChange} value={schedule.location} className="form-control" name="location" id="staticEmail" />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label labelStyle">Subject</label>
        <div className="col-sm-10">
          <input type="text" onChange={handleChange} value={schedule.subject} className="form-control" name="subject" id="staticEmail" />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label labelStyle">Message</label>
      </div>
      <div className="mb-3 row">

        <div className="col-sm-12">
          <textarea className="form-control" rows="4" value={schedule.message} onChange={handleChange} name="message" id="inputPassword"></textarea>
        </div>
      </div>
      <div className='d-flex justify-content-end row-spacing'>
        <button className='btn btn-success mx-2' onClick={saveScheduleFn}>{mode == 'E' ? 'Update' : 'Save'}</button>
        <button className='btn btn-warning mx-2' onClick={() => { props.handleClose(false) }}>Close</button>
      </div>
    </div >
  )
}
