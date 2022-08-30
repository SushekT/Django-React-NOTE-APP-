import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Paper from '@mui/material/Paper';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';
import { usersResetPassword } from '../reducers/login/login.action';
import Message from '../components/Message';

function ResetPassword({ history, match }) {
    const [newpassword, setNewPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [validationError, setValidationError ] = useState(false)
    const width = '60%;'

    const resetPassword = useSelector(state => state.userForgetPassword)
    const { error, loading, userResetPassword, success } = resetPassword
    const dispatch = useDispatch()
    console.log(success)
    useEffect(() => {
        if (success){
            history.push('/')
        }
    }, [success])

    const submitHandler = (e) =>{
        e.preventDefault()
        const uid = match.params.uid
        const token = match.params.token
        if (newpassword === confirmpassword){
            dispatch(usersResetPassword(uid, token, newpassword, confirmpassword))
        }else{
            console.log('ashdkjasdkajsdhkajsd')
            setValidationError(true)
        }
        
    }


  return (
    <div className="notes">
        <div className='notes-header'>
        </div>
        <div className='notes-list'>
        <Paper container elevation={3}>
            <Grid container item xs={12} marginTop={10} alignItems="center" direction="column">
                <LoginIcon sx={{ color: 'action.active', mt:3}}/>
                <Typography variant="h6" gutterBottom component="div" sx={{ color: 'action.active', }}>
                    Reset Password
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 320 }} padding={1}>
                
                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="newpassword" label="New Password" type="password" value={newpassword}
                     variant="standard" margin='dense' fullWidth onChange={(e) => setNewPassword(e.target.value)}/>
            
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 320 }} >
                
                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="confirmpassword" type="password" label="Confirm Password" value={confirmpassword}
                     variant="standard" margin="dense" fullWidth onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Box>
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                {validationError && <Message width={width} alignItems="center" error={"Password Does Not Match"} ></Message> }
                { error && <Message width={width} alignItems="center" error={error} >Some Error Occured</Message> }
                { success && <Message width={width} alignItems="center" error={success} >Password Successfully changed</Message> }
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
            <Button type='submit' variant="outlined" color="warning" sx={{ color: 'action.active', mt:2}} onClick={submitHandler} >
            {
                loading ? <CircularProgress /> : 'Change Password'
            }
            </Button>
            </Grid>
            
            
        </Paper>
        </div>
    </div>
  )
}

export default ResetPassword