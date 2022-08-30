import React from 'react'
import { logout } from '../reducers/login/login.action';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';

export default function LogoutButton() {

const dispatch = useDispatch()
const history = useHistory();

const logoutHandler = () =>{
    dispatch(logout())
    history.push('/')
    }
  return (
    <Tooltip title="Logout">
    <div onClick={logoutHandler} className='logout-button'>
        <ExitToAppIcon />
        </div>
    </Tooltip>
  )
}
