// @ts-ignore
import * as React from 'react';
// @ts-ignore
// @ts-ignore
import Button from '@mui/material/Button';
// @ts-ignore
import Dialog from '@mui/material/Dialog';
// @ts-ignore
// @ts-ignore
import DialogActions from '@mui/material/DialogActions';
// @ts-ignore
import DialogContent from '@mui/material/DialogContent';
// @ts-ignore
// @ts-ignore
import DialogContentText from '@mui/material/DialogContentText';
// @ts-ignore
import DialogTitle from '@mui/material/DialogTitle';
// @ts-ignore
import IconButton from '@mui/material/IconButton';
// @ts-ignore
import CloseIcon from '@mui/icons-material/Close';
// @ts-ignore
import Typography from '@mui/material/Typography';
import '../styles/dialog.css'
// @ts-ignore
export default function CustomDialog(props) {
    // @ts-ignore
    const [open, setOpen] = React.useState(false);

    // @ts-ignore
    const handleClickOpen = () => {
        setOpen(true);
    };

    // @ts-ignore
    const handleClose = (refresh=false) => {
        

        props.callBackFn(refresh)

        props.handleClose()
        //setOpen(false);
        

    };
    
    let Comp = props.cmp;
    return (
        <div>

            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} style={{backgroundColor:'#e3eee3'}}>
                    {

                        props.title}
                    {

                        props.handleClose ? (
                            <IconButton
                                aria-label="close"
                               
                                onClick={props.handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                  
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                </DialogTitle>
                <DialogContent>
                    <Comp data={props.data} handleClose={handleClose}/>
                </DialogContent>

            </Dialog>

        
        </div>
    );
}
