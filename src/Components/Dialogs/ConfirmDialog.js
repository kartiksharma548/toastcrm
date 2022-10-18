// @ts-ignore
import * as React from 'react';
// @ts-ignore
import Button from '@mui/material/Button';
// @ts-ignore
import Dialog from '@mui/material/Dialog';
// @ts-ignore
import DialogActions from '@mui/material/DialogActions';
// @ts-ignore
import DialogContent from '@mui/material/DialogContent';
// @ts-ignore
import DialogContentText from '@mui/material/DialogContentText';
// @ts-ignore
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props) {
 

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleOkCancel=(action)=>{
    props.callbackFunction(action)
  }
//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      
      <Dialog
        open={props.open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"  style={{backgroundColor:'rgb(234 235 255)'}}>
          {props.title}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" style={{paddingTop:'10px'}}>
            {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-success" onClick={()=>handleOkCancel(true)} autoFocus>
            OK
          </button>
          {!props.hideCancel && <button className="btn btn-danger" onClick={()=>handleOkCancel(false)}>Cancel</button>}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
