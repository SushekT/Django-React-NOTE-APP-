import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_FORGOT_PASSWORD_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_UPDATE_GET_SUCCESS,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    GET_USER_RESET
    

 } from './logic.types'

 export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/user/create/',
            {'email': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }


 export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/user/register/',
            {'email': email, 'username': username, 'password': password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }

 export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT
    })
 }

 export const userForgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/auth/users/reset_password/',
            {'email': email},
            config
        )

        dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_RESET,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }

 export const usersResetPassword = (uid, token, password, confirm_password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/auth/users/reset_password_confirm/',
            {'uid': uid, 'token': token, 'new_password': password, 're_new_password': confirm_password},
            config
        )

        dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_RESET,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }

 export const profileUpdate = ( forms ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const { data } = await axios.patch(
            '/user/profile-update/',
            forms,
            config
        )

        dispatch({
            type: USER_UPDATE_GET_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }


 export const getProfileUpdate = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            '/user/profile-update/',
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }


 export const allUsers = ( name ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_REQUEST
        })
        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const { data } = await axios.get(
            `/user/users/?search=${name}`,
            config
        )

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message,
        })
    }
 }