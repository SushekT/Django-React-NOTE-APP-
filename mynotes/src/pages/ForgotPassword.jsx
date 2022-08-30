import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';
import { userForgotPassword } from '../reducers/login/login.action';
import Message from '../components/Message';

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const width = '60%;'

    const userForgetPassword = useSelector(state => state.userForgetPassword)
    const { success, loading: forgerpasswordloading, error } = userForgetPassword

    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [success,])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(userForgotPassword(email))
    }


  return (
    <div className="notes">
        <div className='notes-header'>
           <Link to='/register'>No Account? Register Here</Link>
        </div>
        <div className='notes-list'>
        <Paper container elevation={3}>
            <Grid container item xs={12} marginTop={10} alignItems="center" direction="column">
                <LoginIcon sx={{ color: 'action.active', mt:3}}/>
                <Typography variant="h6" gutterBottom component="div" sx={{ color: 'action.active', }}>
                    Forgot Password
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 320 }} padding={1}>
                
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField id="email" label="Email" type="email" value={email}
                     variant="standard" margin='dense' fullWidth onChange={(e) => setEmail(e.target.value)}/>
            
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                { error && <Message width={width} alignItems="center" error={error} /> }
                { success && <Message width={width} alignItems="center" success={success} >Reset Mail sent. Please check your mail.</Message> }
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
            <Button type='submit' variant="outlined" color="warning" sx={{ color: 'action.active', mt:2}} onClick={submitHandler} >
            {
                forgerpasswordloading ? <CircularProgress /> : 'Reset Password'
            }
            </Button>
            </Grid>
            
            
        </Paper>
        </div>
    </div>
  )
}

export default ForgotPassword