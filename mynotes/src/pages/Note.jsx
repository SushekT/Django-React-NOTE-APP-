import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote, getNotesDetail, getNotesDetailDelete, getNotesUpdateDetail } from '../reducers/notes/notes.action';
import { USER_NOTE_DETAIL_RESET } from '../reducers/notes/notes.types';
import { allUsers } from '../reducers/login/login.action';
import { addCollaboration, permissionChanger } from '../reducers/collaboration/collaboration.action';
import { COLLABORATION_RESET, PERMISSION_RESET } from '../reducers/collaboration/collaboration.types';


function Note({match, history}) {

    let noteId = match.params.id

    const [collaborateOpen, setCollaborateOpen] = React.useState(false);
    const [options, setOptions] = useState({ 
        email: '',
        id: 0,
        image: ''
});
        
    
    let [note, setNoteDetail] = useState('')
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false)
    const [collaborateEmail, setCollaborateEmail] = useState('')
    const [openSnackBar, setOpenSnackBar] = useState(false);
    

    const dispatch = useDispatch()

    const noteDetailState = useSelector(state => state.noteDetails)
    const { error, loading, noteDetail, success } = noteDetailState


    const getAllUser = useSelector(state => state.getAllUser)
    const { alluser, success:allusersuccess, loading:collaborateLoading } = getAllUser

    const addcollaborator = useSelector(state => state.addcollaborator)
    const { success:addcollaboratorSuccess, error:addcollaboratorerror } = addcollaborator

    const permission = useSelector(state => state.permission)
    const { success:permissionSuccess, error:permissionerror } = permission

    useEffect(() => {
    
        if (allusersuccess) {
          setOptions(alluser.map((user) => ({
            'email': user.user.email,
            'id' : user.id,
            'image': user.profile_pic
          }
            )));
        }
    
  
      }, [allusersuccess, active,]);


      useEffect(() => {
        if (!collaborateOpen) {
          setOptions([]);
        }
      }, [collaborateOpen]);
    
    useEffect(() => {
        
        if (success){
            setNoteDetail(noteDetail)


        }else{
            if (noteId != 'new'){
            dispatch(getNotesDetail(noteId))
            }
        }
        
        
    }, [noteId, noteDetail, dispatch])

    useEffect(() => {
        if (noteId != 'new'){
            dispatch(getNotesDetail(noteId))
        }
        if (addcollaboratorSuccess || addcollaboratorerror || permissionSuccess || permissionerror) {
            setOpenSnackBar(true)
        }
        
    }, [addcollaboratorSuccess, addcollaboratorerror, permissionSuccess, permissionerror])

    useEffect(() => {
        return () => {
          dispatch({
            type: USER_NOTE_DETAIL_RESET
        })
        dispatch({
            type: COLLABORATION_RESET
        })
        dispatch({
            type: PERMISSION_RESET
        })
        };
      }, []);

    

    let updateNote = () => {
            dispatch(getNotesUpdateDetail({noteId, ...note, 'updated': new Date() }))
    }


    let createNote = () => {
        if (noteId != 'new') return
       
            dispatch(createNewNote({...note, 'updated': new Date()}))
      
            history.push('/')
    }

    let deleteNote = async() => {
        if (noteId == 'new') return
        dispatch(getNotesDetailDelete(noteId))
        history.push('/')
    }

    let handleSubmit = () =>{

        if (noteId !== 'new' && !note.body){
            deleteNote()
        }

        else if(noteId !== 'new'){
            updateNote()
        }

        else if(noteId === 'new' && note !== ''){
            createNote()
        }
        
        history.push('/')
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const inputChange = (e) =>{
      if (e.target.value.length > 1){
        dispatch(allUsers(e.target.value))
        setActive(true)
      }
    }

    const handleAdd = (e) =>{
        const formData = new FormData()
        formData.append('collaborators', collaborateEmail);
        dispatch(addCollaboration(formData, noteId))
        setOpen(false);
    }

    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const [permissionId, setPermissionId] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setPermissionId(event.target.value);
    };

    const handleCloseSnackBar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSnackBar(false);
        };

    const permissionChange = (e, collaborationId) => {
        if(e.target.value == 20){
            dispatch(permissionChanger({permission: 'READ_ONLY'}, collaborationId))
        }else{
            dispatch(permissionChanger({permission: 'EDITOR'}, collaborationId))
        }
        setCollaborateOpen(false)
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
            UNDO
            </Button>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
            >
            <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
        );

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                    
                            <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    <>
                        <Grid sx={{ flexGrow: 0.9 }}>

                            <AvatarGroup max={4} sx={{ ml:4 }}>
                                {noteDetail? noteDetail.collaborators.map((collaborators) => (
                                    <Avatar key={collaborators.collaborators.id} alt={collaborators.collaborators.username} 
                                    src={collaborators.profile == null ? 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg' :  collaborators.profile.profile_pic } />
                                )): ''}
                                
                            </AvatarGroup>
                        </Grid>
                        <button onClick={deleteNote}>Delete</button>
                    </>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            {loading ? 
                <Box sx={{ ml:28, mt:10}}>
                <CircularProgress color={'warning'} />
              </Box>
            : note? 
            <textarea onChange={(e) => {setNoteDetail({...note, 'body': e.target.value})}} value={note.body}>
            </textarea> :
            <textarea onChange={(e) => {setNoteDetail({...note, 'body': e.target.value})}} value = ''>
            </textarea>
            }

            <div>
                <div onClick={handleClickOpen} className='collaborate-button'>
                    <PersonAddAltIcon />
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle> <PersonAddAltIcon /> Add a Collaboration</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please add the authorized person as they can view/edit your notes.
                        {
                            noteDetail? <List dense sx={{ width: '100%', 
                           position: 'relative', overflow: 'auto', 
                            maxHeight: 100,
                            '&::-webkit-scrollbar': {
                                width: '0.09em'
                              },
                              '&::-webkit-scrollbar-track': {
                                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                              },
                              '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,.1)',
                                outline: '1px solid slategrey'
                              } }}>
                            {noteDetail.collaborators.map((collaborator) => {
                                const labelId = `checkbox-list-secondary-label-${collaborator.id}`;
                                return (
                                <ListItem
                                    key={collaborator.collaborators.id} sx={{ p: 3 }}
                                    secondaryAction={
                                        <FormControl fullWidth>
                                            <InputLabel id="select-label">Permission</InputLabel>
                                            <NativeSelect
                                            defaultValue={collaborator.permission == "EDITOR" ? 10 : 20 }
                                            onChange={(e, newValue)=>{
                                                permissionChange(e, collaborator.id)
                                            }}
                                            >
                                                <option value={10}>Editor</option>
                                                <option value={20}>Read Only</option>
                                               
                                            </NativeSelect>
                                      </FormControl>
                                    }
                                    disablePadding
                                >
                                  
                                    <ListItemAvatar key={collaborator.collaborators.id}>         
                                        <Avatar
                                        alt={collaborator.username}
                                        src={collaborator.profile == null ? 'https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg' :  collaborator.profile.profile_pic }
                                        />
                                    </ListItemAvatar>
                                    <ListItemText key={labelId} id={labelId} primary={`${collaborator.collaborators.email}`} />
                                    
                                </ListItem>
                                );
                            })}
                            </List> : 'dsfs'
                        }
                        
                    </DialogContentText>
                    <Autocomplete
                        id="collaboration_search"
                        sx={{ width: 500, mt: 2 }}
                        open={collaborateOpen}
                        onOpen={() => {
                            setCollaborateOpen(true);
                        }}
                        onClose={() => {
                            setCollaborateOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.email === value}
                        getOptionLabel={(option) => option.email}
                        options={options}
                        loading={collaborateLoading}
                        onChange = {(event, newValue) =>{
                            setCollaborateEmail(newValue.email)
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            onChange = {(e) => inputChange(e)}
                            label="Search By Email"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {collaborateLoading ? <CircularProgress color="warning" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                            />
                        )}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => handleAdd(e)}>Add Them</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackBar}
                    message={addcollaboratorSuccess || permissionSuccess?"Permission Granted Successfully": "You don't have permission to do this action"}
                    action={action}
                />
            </div>

        </div>
  
    )
}



export default Note
