import React from 'react'
import { Link } from 'react-router-dom'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function CollaborateButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
        <Link onClick={handleClickOpen} className='collaborate-button'>
            <PersonAddAltIcon />
        </Link>
         <Dialog open={open} onClose={handleClose}>
         <DialogTitle> <PersonAddAltIcon /> Add a Collaboration</DialogTitle>
         <DialogContent>
           <DialogContentText>
             Please add the authorized person as they can view/edit your notes.
           </DialogContentText>
           
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose}>Cancel</Button>
           <Button onClick={handleClose}>Add Them</Button>
         </DialogActions>
       </Dialog>
       </div>
    )
}

export default CollaborateButton
