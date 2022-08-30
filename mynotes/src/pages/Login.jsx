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
import { login } from '../reducers/login/login.action';
import Message from '../components/Message';

function Login({ history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const width = '60%;'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo){
            history.push('/note')
        }
    }, [history, userInfo,])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
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
                    Sign In
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 320 }} padding={1}>
                
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
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column">
                { error && <Message width={width} alignItems="center" error={error} /> }
            </Grid>
            <Grid container item xs={12} maxWidth="sm" alignItems="center" direction="column" padding={1}>
            <Button type='submit' variant="outlined" color="warning" sx={{ color: 'action.active', mt:2}} onClick={submitHandler} >
            {
                loading ? <CircularProgress /> : 'Log In'
            }
            </Button>
            <Link to='/forgot-password'><Button href="#text-buttons" sx={{ color: 'action.active', mt:2, mb:1}}>Forgot Password?</Button></Link>
            </Grid>
            
            
        </Paper>
        </div>
    </div>
  )
}

export default Login