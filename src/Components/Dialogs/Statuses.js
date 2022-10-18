// @ts-ignore
import React, { useEffect, useState,useRef  } from 'react'
// @ts-ignore
import { getSubStatuses } from '../../services/leadService';
import ConfirmDialog from './ConfirmDialog';
import { changeStatus } from '../../services/leadService';
import Schedule from '../Forms/Schedule'
import CustomDialog from '../Dialog'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLead } from '../../state/index'
import Note from '../Forms/Note'
// @ts-ignore
export default function Statuses(props) {

    let { data } = props;
    const subStatusref = useRef({});

    const [substatus, setsubstatus] = useState({});
    const [statuses, setstatuses] = useState([]);
    const [mode, setmode] = useState('C');
    const [openNoteDialog, setopenNoteDialog] = React.useState(false);
    const [dialogTitle, setdialogTitle] = useState('');
    const [dialogMessage, setdialogMessage] = useState('');
    const [openconfirmDialog, setopenconfirmDialog] = useState(false);
    const [openScheduleDialog, setopenScheduleDialog] = useState(false);

    // const dispatch = useDispatch();
    // const lead_id = useSelector(state => state.lead);
    useEffect(() => {

        getSubStatusesFn();

    }, []);
    useEffect(() => {
      console.log(substatus)
    
      return () => {
        
      }
    }, [substatus])
    

    const getSubStatusesFn = async () => {

        let response = await getSubStatuses(data.lead.substatus.sub_status_id);
       
        setstatuses(response.data)
    }

    const isEven = (number) => {
        return number % 2 == 0;
    }

    const handleClose = (refresh = false) => {


        setopenScheduleDialog(false);
        setopenNoteDialog(false);
    };

    const finalStatusChange = async (sub_status_id=null) => {

        let obj = {
            lead_id: data.lead.lead_id,
            new_status_id: sub_status_id==null? substatus.sub_status_id:sub_status_id

        }

        let response = await changeStatus(obj);
        if (response.status == 200)
            props.handleClose(true)

    }

    const confirmFn = async (action) => {
        if (action) {
            finalStatusChange()
        }
        setopenconfirmDialog(false);
    }
    const changeStatusFn = (subStatus) => {
        setsubstatus(subStatus);
        if (subStatus.status.status_id_name == 'STATUS_LOST') {
            setdialogTitle('Confirm');
            setdialogMessage('Are you sure you want to change the status to "Lost"');
            setopenconfirmDialog(true);
        }
        else if (subStatus.status.status_id_name == 'STATUS_APP') {
            setopenScheduleDialog(true);

        }
        else{
            setmode('N');
            setopenNoteDialog(true);
        }

    }

    const createCancelSchedule = (action) => {
        if (action) {
            finalStatusChange();

            props.handleClose(true)
        }
    }

    const createCancelCompleteSchedule = (subStatus) => {
       
        
        if (subStatus!=null) {
            setsubstatus(subStatus) 
            
            
            finalStatusChange(subStatus.sub_status_id);

            props.handleClose(true)
        }
    }
    const handleNoteClickOpen = (mode) => {
        setmode(mode);
        setopenNoteDialog(true);

    };
    return (
        <>

            <ConfirmDialog title={dialogTitle} hideCancel={false} msg={dialogMessage} callbackFunction={confirmFn} open={openconfirmDialog}></ConfirmDialog>
            <CustomDialog cmp={Schedule} data={{ lead: data.lead, status: substatus.sub_status_name, mode: 'N' }} open={openScheduleDialog} handleClose={handleClose} callBackFn={createCancelSchedule} title={'Add Schedule'}></CustomDialog>
            <CustomDialog cmp={Note} data={{ lead: data.lead, mode:mode }} open={openNoteDialog} handleClose={handleClose} callBackFn={createCancelCompleteSchedule} title={'Add Note'}></CustomDialog>
            <div className='mt-1' style={{ width: '613px' }}>
                <ul className="list-group">
                    {
                        data.lead.substatus.status.status_id_name == "STATUS_APP" ? <>
                            <div>
                                To change this status, you must either mark the schedule as Complete or Cancel.
                            </div>
                            <div className="btn-group-vertical">
                                <button className='btn btn-success mb-2 mt-2' onClick={()=>handleNoteClickOpen('C')} style={{ border: '1px solid' }}>Complete Schedule</button>
                                <button className='btn btn-danger mb-2' onClick={()=>handleNoteClickOpen('CA')} style={{ border: '1px solid' }}>Cancel Schedule</button>
                            </div></> :


                            // @ts-ignore
                            statuses.map((x, index) => {
                                // @ts-ignore
                                // @ts-ignore
                                // @ts-ignore
                                return <li key={x.sub_status_id} style={{ backgroundColor: isEven(index) ? 'aliceblue' : '#efd3d3' ,    textAlign: 'center'}} onClick={() => changeStatusFn(x)} className="list-group-item list-group-item-action">{x.sub_status_name}</li>
                            })

                    }


                </ul>

            </div>
        </>

        // @ts-ignore
        // @ts-ignore
    )
}
