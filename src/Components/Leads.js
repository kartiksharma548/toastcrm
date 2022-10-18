// @ts-ignore
// @ts-ignore
// @ts-ignore
import React, { useEffect, useState, useContext } from 'react'
import '../styles/leads.css'
import ConfirmDialog from './Dialogs/ConfirmDialog';
// @ts-ignore
import { formatDateForHtml, getTimeFormat } from '../services/utilities'
import { getLeads, getStatuses, getNotes, deleteNote, getSchedules, deleteSchedule, getSubStatuses } from '../services/leadService'
// @ts-ignore
// @ts-ignore
// @ts-ignore
import { LoginContext } from '../contexts/LoginContext'
// @ts-ignore
import Local from '../services/local.service'

// @ts-ignore
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// @ts-ignore
import CustomDialog from './Dialog'
// @ts-ignore
import LeadForm from './Forms/LeadForm'

// @ts-ignore
import Note from './Forms/Note'
import Schedule from './Forms/Schedule'
import Statuses from './Dialogs/Statuses'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLead, getSelectedSchedule } from '../state/index'


export default function Leads() {

    const [leads, setleads] = useState([]);

    const dispatch = useDispatch();
    const [mode, setmode] = useState('N')
    const lead_id = useSelector(state => state.lead);
    const user = JSON.parse(Local.get('user'))
    useEffect(() => {

        // @ts-ignore 
        loadLeads();

        loadStatuses();




    }, [])
    const loadStatuses = async () => {
        let data = await getStatuses();
        console.log(data.data)
        setstatusArr(data.data);
    }
    const loadLeads = (data = null) => {
        // @ts-ignore
        getLeads(user.id, obj).then((res) => {
            setrowSelect(0);
            setleads(res.data)
            setlead(res.data[0]);
            if (res.data.length > 0) {
                setTimeout(() => {

                    loadNotes(res.data[0].lead_id)
                    loadSchedules(res.data[0].lead_id)
                }, 500);
            }
            else {
                setnotes([]);
                setschedules([]);
            }


        })
    }

    const updateRefreshLead = () => {
        obj.lead_id = lead.lead_id;
        getLeads(user.id, obj).then((res) => {

            let keys = Object.keys(leads[rowSelect]);
            keys.forEach(key => {
                leads[rowSelect][key] = res.data[0][key]
            });

            if (res.data.length > 0) {
                setTimeout(() => {

                    loadNotes(lead.lead_id)
                    loadSchedules(lead.lead_id)
                }, 500);
            }
            else {
                setnotes([]);
                setschedules([]);
            }


        })
    }

    //Dialogs
    const [openLeadDialog, setopenLeadDialog] = React.useState(false);
    const [openNoteDialog, setopenNoteDialog] = React.useState(false);
    const [openStatusDialog, setopenStatusDialog] = React.useState(false);
    const [openScheduleDialog, setopenScheduleDialog] = React.useState(false);


    const [lead, setlead] = useState(null)
    const [status, setstatus] = useState('')
    const [statusArr, setstatusArr] = useState([])
    const [searchQuery, setsearchQuery] = useState('')
    const [readOnlyForm, setreadOnlyForm] = useState(false)
    const [rowSelect, setrowSelect] = useState(0)
    const [dialogTitle, setdialogTitle] = useState('');
    const [dialogMessage, setdialogMessage] = useState('');
    const [openconfirmDialog, setopenconfirmDialog] = useState(false);

    const [notes, setnotes] = useState([])
    const [schedules, setschedules] = useState([])

    const [selectedNote, setselectedNote] = useState(null)
    const [selectedSchedule, setselectedSchedule] = useState(null)

    let obj = {
        query: '',
        status: status,
        lead_id: ''
    }
    // @ts-ignore
    const handleLeadClickOpen = (newObject, readOnly) => {

        setlead(newObject);
        setreadOnlyForm(readOnly)
        setopenLeadDialog(true);

    };

    // @ts-ignore
    const handleNoteClickOpen = (noteObj, mode) => {

        setselectedNote(noteObj)
        setmode(mode);



        setopenNoteDialog(true);

    };
    const handleScheduleClickOpen = (scheduleObj, mode) => {

        setselectedSchedule(scheduleObj)
        setmode(mode);



        setopenScheduleDialog(true);

    };

    const handleStatusesClickOpen = (lead) => {

        if (lead.substatus.status.status_id_name != "STATUS_LOST")
            setopenStatusDialog(true);

    };
    const rowSelectFn = (newObject, index) => {
        dispatch(getLead(leads[index].lead_id))
        setlead(newObject);
        setrowSelect(index)
    }
    // @ts-ignore
    const statusChange = (e) => {
        setstatus(e.target.value)
        obj.status = e.target.value
        loadLeads()
    }



    const searchLeads = () => {

        obj.query = searchQuery
        loadLeads()
    }
    // @ts-ignore
    // @ts-ignore
    const handleClose = (refresh = false) => {

        setopenLeadDialog(false);
        setopenNoteDialog(false);
        setopenScheduleDialog(false);
        setopenStatusDialog(false);
    };


    // @ts-ignore




    // @ts-ignore

    useEffect(() => {

        loadNotes(lead_id);
        loadSchedules(lead_id)
        return () => {

        }
    }, [lead_id])

    const loadNotes = (id) => {
        getNotes(id).then((response) => {
            //console.log(response.data);
            setnotes(response.data)
        })
    }

    const loadSchedules = (id) => {
        getSchedules(id).then((response) => {
            dispatch(getSelectedSchedule(response.data[0]))
            setschedules(response.data)
        })
    }

    const deleteNoteFn = (noteId) => {
        deleteNote(noteId).then((response) => {
            loadNotes(lead_id);
        })
    }

    const deleteScheduleFn = (sch) => {
        if (!sch.isCancelled && !sch.isCompleted) {

            setdialogTitle('Alert');
            setdialogMessage('Please complete or cancel the schedule before deleting.');
            setopenconfirmDialog(true);

            return;

        }


        deleteSchedule(sch.schedule_id).then((response) => {
            loadSchedules(lead_id);
        })
    }

    const handleStatusChange = () => {
        updateRefreshLead()
    }

    const confirmFn = (action) => {
        setopenconfirmDialog(false);
    }

    return (
        <>
            <CustomDialog cmp={LeadForm} data={{ lead, readOnlyForm }} open={openLeadDialog} handleClose={handleClose} callBackFn={updateRefreshLead} title={readOnlyForm ? 'View Lead' : 'Edit Lead'}></CustomDialog>
            <CustomDialog cmp={Note} data={{ lead: lead, mode: mode, note: selectedNote }} open={openNoteDialog} handleClose={handleClose} callBackFn={() => { loadNotes(lead_id) }} title={mode == 'N' ? 'Add Note' : 'Edit Note'}></CustomDialog>
            <CustomDialog cmp={Schedule} data={{ lead: lead, mode: mode, schedule: selectedSchedule }} open={openScheduleDialog} handleClose={handleClose} callBackFn={() => { loadSchedules(lead.lead_id) }} title={mode == 'N' ? 'Add Schedule' : 'Edit Schedule'}></CustomDialog>

            <CustomDialog cmp={Statuses} data={{ lead: lead }} open={openStatusDialog} handleClose={handleClose} callBackFn={handleStatusChange} title='Change Status'></CustomDialog>
            <ConfirmDialog title={dialogTitle} hideCancel={true} msg={dialogMessage} callbackFunction={confirmFn} open={openconfirmDialog}></ConfirmDialog>
            <div className='d-flex justify-content-between align-items-center'>

                <div className="input-group ">
                    <div className="form-outline">
                        <input type="search" value={searchQuery} onChange={(e) => {
                            setsearchQuery(e.target.
                                // @ts-ignore
                                value)
                        }} id="form1" className="form-control" placeholder='Search by name...' />

                    </div>
                    <button onClick={searchLeads} type="button" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" height='15' width='20' viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg>
                    </button>
                </div>
                <div className='labelDiv'>
                    <label className='form-label' style={{ marginBottom: '0px', fontWeight: '500' }}>Status Filter</label>
                    <select className="form-control mx-2" onChange={statusChange} aria-label="Default select example" value={status}>
                        <option value=''>All</option>
                        {
                            // @ts-ignore
                            statusArr.map((x) => {
                                return <option key={x.status_id} value={x.status_id}>{x.status_name}</option>
                            })}
                    </select>
                </div>

                <button className="btn btn-warning my-2" onClick={loadLeads}>
                    <svg xmlns="http://www.w3.org/2000/svg" height='15' width='20' viewBox="0 0 512 512">
                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
                    </svg>
                </button>


            </div>

            <div className="table-responsive tableDiv">

                <table className="table table-sm">
                    <thead className="table-secondary">
                        <tr>

                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            // @ts-ignore
                            leads.map((x, index) => {
                                return <tr className={`${rowSelect == index ? 'rowSelect' : ''}`} onClick={() => rowSelectFn(x, index)} key={x.lead_id}>
                                    <td scope="row"><span  >{x.first_name}</span></td>
                                    <td><span  >{x.last_name}</span></td>
                                    <td><span  >{x.address1}</span></td>
                                    <td><span  >{x.phone_number}</span></td>
                                    <td><button type='button' className='status btn' onClick={() => handleStatusesClickOpen(x)} role="button" style={{ color: x.substatus.status.status_forecolor, backgroundColor: x.substatus.status.status_backcolor, whiteSpace: 'nowrap' }}>{x.substatus.status.status_name} - {x.substatus.sub_status_name}</button></td>
                                    <td title='View Lead'><span onClick={() =>
                                        // @ts-ignore
                                        handleLeadClickOpen(x, true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 576 512"><path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z" /></svg>

                                    </span></td>
                                    <td title='Edit Lead'> <span onClick={() => handleLeadClickOpen(x, false)}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" /></svg>
                                    </span></td>
                                    <td title='Menu'>
                                        <span className="nav-item dropdown dropstart" >
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 448 512"><path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" /></svg>
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" >
                                                <li onClick={() => handleNoteClickOpen(x, 'N')}><span className="dropdown-item" >Take a Note</span></li>
                                                {/* {x.substatus.status.status_id_name != "STATUS_LOST" && <li onClick={() => handleScheduleClickOpen(x, 'N')}><span className="dropdown-item" >Schedule</span></li>} */}
                                                {/* <li><hr className="dropdown-divider"></li> 
                                                <li><span className="dropdown-item" >Something else here</span></li>*/}
                                            </ul>
                                        </span>

                                    </td>
                                </tr>
                            })
                        }


                    </tbody>
                </table>
            </div>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar-right collapse">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Notes</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Schedules</button>
                    </li>

                </ul>
                <div className="tab-content overflow-auto" id="myTabContent " style={{ height: '500px' }}>
                    <div className="tab-pane fade show active py-4" id="home" style={{ paddingBottom: '30px' }} role="tabpanel" aria-labelledby="home-tab">
                        {notes.map((note) => {
                            return <div key={note.note_id} className="list-group mb-1">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{note.subject}</h5>

                                    </div>
                                    <p className="mb-1">{note.note}</p>
                                    <div className='d-flex justify-content-end '>
                                        <span title="Edit" onClick={() => handleNoteClickOpen(note, 'E')} className='mx-2'> <svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" /></svg></span>
                                        <span title="Delete" onClick={() => deleteNoteFn(note.note_id)} className='mx-2'><svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></span>
                                    </div>
                                </a>

                            </div>
                        })}
                    </div>
                    <div className="tab-pane fade" id="profile" style={{ paddingBottom: '30px' }} role="tabpanel" aria-labelledby="profile-tab">
                        {schedules.map((sch) => {
                            return <div key={sch.schedule_id} className="list-group mb-1">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true" style={{ backgroundColor: sch.isCompleted ? '#dfffe3' : sch.isCancelled ? '#ffd7d7' : '' }}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{sch.subject}</h5>

                                    </div>
                                    <p className="mb-1">{sch.message}</p>
                                    <p>{formatDateForHtml(sch.schedule_dateTime.split(' ')[0])}</p>
                                    <strong>{getTimeFormat(sch.schedule_dateTime.split(' ')[1])}</strong>
                                    <div className='d-flex justify-content-end '>
                                        <span title="Edit" onClick={() => handleScheduleClickOpen(sch, 'E')} className='mx-2'> <svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 512 512"><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" /></svg></span>
                                        <span title="Delete" onClick={() => deleteScheduleFn(sch)} className='mx-2'><svg xmlns="http://www.w3.org/2000/svg" width='16.68' height='16.68' viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></span>
                                    </div>
                                </a>

                            </div>
                        })}
                    </div>

                </div>
            </nav>
        </>



    )
}
