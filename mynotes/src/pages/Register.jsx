import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Paper from '@mui/material/Paper';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../reducers/login/login.action';
import Message from '../components/Message';

function Register({ history }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const width = '60%;'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo){
           history.push('/')
        }
    }, [history, userInfo,])

    const submitHandler = (e) =>{
        e.preventDefault()
        if (password == confirmPassword){
            dispatch(register(username, email, password))
        }else{
            setConfirmPasswordError(true)
        }
    }


  return (
    <div className="notes">
        <div className='notes-header'>
            <Link to="/">Already Account? Login Here</Link>
        </div>
        <div className='notes-list'>
        <Paper container elevation={3}>
            <Grid container item xs={12} marginTop={10} alignItems="center" direction="column">
                <AppRegistrationIcon sx={{ color: 'action.active', mt:3}}/>
                <Typography variant="h6" gutterBottom component="div" sx={{ color: 'action.active', }}>
                    Register Account
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 340 }} padding={1}>
                
                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField id="username" label="Username" type="email" value={username}
                    variant="standard" margin='dense' fullWidth onChange={(e) => setUsername(e.target.value)}/>
        
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 340 }} padding={1}>
                
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField id="email" label="Email" type="email" value={email}
                     variant="standard" margin='dense' fullWidth onChange={(e) => setEmail(e.target.value)}/>
            
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 320 }} >
                
                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="password" type="password" label="Password" value={password}
                     variant="standard" margin="dense" fullWidth onChange={(e) => setPassword(e.target.value)}/>
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 320 }} >
                
                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="confirm_password" type="password" label="Confirm Password" value={confirmPassword}
                     variant="standard" margin="dense" fullWidth onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                { error && <Message width={width} alignItems="center" error={error} /> }
                { confirmPasswordError && <Message width={width} alignItems="center" error={'Password Does not Match'} /> }
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
            <Button type='submit' variant="outlined" color="warning" sx={{ color: 'action.active', mt:2}} onClick={submitHandler} >
            {
                loading ? <CircularProgress /> : 'Register'
            }
            </Button>
            <Button href="#text-buttons" sx={{ color: 'action.active', mt:2, mb:1}}>Forgot Password?</Button>
            </Grid>
            
            
        </Paper>
        </div>
    </div>
  )
}

export default Register