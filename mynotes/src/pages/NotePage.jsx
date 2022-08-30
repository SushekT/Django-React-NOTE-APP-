import React, {useState, useEffect} from 'react'

//import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';


import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../reducers/notes/notes.action';
import { USER_NOTES_RESET, USER_NOTE_DETAIL_DELETE_RESET, USER_NOTE_DETAIL_RESET } from '../reducers/notes/notes.types';
import LogoutButton from '../components/LogoutButton';
import { getProfileUpdate } from '../reducers/login/login.action';

const NotePage = () => {

    const [noteslist, setNotesList] = useState([])
    const [open, setOpen] = React.useState(false);

    const noteState = useSelector(state => state.notes)
    const { error, loading, notes, success } = noteState

    
    const noteDetailState = useSelector(state => state.noteDetails)
    const { success:noteDetailSuccess,  } = noteDetailState

    const noteDeleteState = useSelector(state => state.noteDetailsDelete)
    const { success:noteDeleteSuccess, error:NoteDetailDeleteError } = noteDeleteState

    const dispatch = useDispatch()
    
    useEffect(()=>{
        setNotesList(notes)
        if (noteDetailSuccess){
            dispatch(getNotes())
            dispatch({
                type: USER_NOTE_DETAIL_RESET
            })
        }
        if(noteDeleteSuccess){
            dispatch(getNotes())
            dispatch({
                type: USER_NOTE_DETAIL_DELETE_RESET
            })
        }
        if (NoteDetailDeleteError){
            setOpen(true);
        }
    }, [success,noteDetailSuccess,notes, noteDeleteSuccess, NoteDetailDeleteError])

    useEffect(()=>{
        dispatch(getNotes())
        dispatch(getProfileUpdate());
    }, [])

    useEffect (() =>{
        return () => { 
            dispatch({
              type: USER_NOTES_RESET
          })
          dispatch({
            type: USER_NOTE_DETAIL_DELETE_RESET
          })
          };
    }, [])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };

    const action = (
    <React.Fragment>
        <Button color="warning" size="small" onClick={handleClose}>
        Close
        </Button>
        <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
    );

    return (
    
        <div className="notes">
            <div className='notes-header'>
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className='notes-count'>{noteslist? noteslist.length: ''}</p>
            </div>

            <div className='notes-list'>
                {
                loading ?  
                <Box sx={{ ml:28, mt:10}}>
                        <CircularProgress color={'warning'} />
                    </Box>
                     :  noteslist ? 
                     noteslist.map((note, index)=> (
                         <ListItem key={index} note={note} />
                     )) :
                    ''     
                }

            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={NoteDetailDeleteError}
                action={action}     
            />
            <LogoutButton />
            <AddButton />
            
            
        </div>  
       
    )
}

export default NotePage
