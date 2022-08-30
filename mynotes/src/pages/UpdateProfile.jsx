import React, {useState, useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


import Message from '../components/Message';
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'
import { getProfileUpdate, profileUpdate } from '../reducers/login/login.action';
import { USER_UPDATE_RESET } from '../reducers/login/logic.types';

export default function UpdateProfile() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const [open, setOpen] = React.useState(false);
    const width = '60%;'

    const dispatch = useDispatch()

    const loadUpdateProfile = useSelector(state => state.userProfileUpdate)
    const { error, loading, loadedUpdatedProfile, success, updateSuccess } = loadUpdateProfile

    useEffect(() =>{

        if (success){
            setFirstName(loadedUpdatedProfile.user.first_name);
            setLastName(loadedUpdatedProfile.user.last_name);
            setImage(loadedUpdatedProfile.profile_pic)
            
        }
        if (updateSuccess){
            setOpen(updateSuccess)
        }

    },[success, updateSuccess])

    useEffect(() => {
        dispatch(getProfileUpdate());
        
    }, [])

    const history = useHistory()
    let handleSubmit = () =>{
        history.push('/')
    }
    const submitHandler = (e) =>{
        e.preventDefault()

        const formData = new FormData()
        if (newImage){
            formData.append('profile_pic', newImage);
        }
        
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        dispatch(profileUpdate(formData))
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        console.log('close')
    
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


    useEffect (() =>{
        return () => { 
            dispatch({
                type: USER_UPDATE_RESET
            })
            };
    }, [])
    return (
    <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/'>
                    
                            <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
            </div>
            <Paper container elevation={3}>
            <Grid container item xs={12} marginTop={6} alignItems="center" direction="column">
            
                <Avatar alt={firstName} src={image} sx={{  width: 76, height: 76, marginTop:2 }}  />
                <IconButton color="warning" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                    <PhotoCamera />  
                </IconButton> 
                <Typography variant="h6" gutterBottom component="div" sx={{ color: 'action.active', }}>
                    Update Your Profile
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 340 }} padding={1}>
                
                    <TextField id="firstName" label="First Name" type="text" value={firstName}
                    variant="standard" margin='dense' onChange={(e) => setFirstName(e.target.value)} sx={{mr:1}}/>
                
                    <TextField id="lastName" label="Last Name" type="text" value={lastName}
                     variant="standard" margin='dense' onChange={(e) => setLastName(e.target.value)}/>
        
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                
            </Grid>
            
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                { error && <Message width={width} alignItems="center" error={error} /> }
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
            <Button type='submit' variant="outlined" color="warning" sx={{ color: 'action.active', mt:2, mb:2}} onClick={submitHandler} disabled={!success} >
            {
                loading ? <CircularProgress /> : 'Confirm'
            }
            </Button>
            </Grid>
            
            
        </Paper>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={'Successfully Updated'}
            action={action}     
        />
       
    </div>
        
    )
    }

