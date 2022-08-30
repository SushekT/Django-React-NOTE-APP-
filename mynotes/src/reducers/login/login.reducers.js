import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,
    
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_RESET,

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

 export const userLoginReducer = (state = { }, action) => {

    switch (action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true, }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
 }

 export const userRegisterReducer = (state = {}, action) => {

    switch (action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true, }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload }

        default:
            return state
    }
 }

 export const userForgetPasswordReducer = (state = {}, action) => {

    switch (action.type){
        case USER_FORGOT_PASSWORD_REQUEST:
            return {loading: true, success:false}

        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, userForgotPassword: action.payload, success:true }

        case USER_FORGOT_PASSWORD_RESET:
            return {loading: false, error: action.payload, success:false }

        default:
            return state
    }
 }

 export const userResetPasswordReducer = (state = {}, action) => {

    switch (action.type){
        case USER_RESET_PASSWORD_REQUEST:
            return {loading: true, success:false}

        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, userResetPassword: action.payload, success:true }

        case USER_RESET_PASSWORD_RESET:
            return {loading: false, error: action.payload, success:false }

        default:
            return state
    }
 }

 export const userProfileUpdateReducer = (state = { }, action) => {

    switch (action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true, success:false}

        case USER_UPDATE_SUCCESS:
            return { loading: false, loadedUpdatedProfile: action.payload, success:true, updateSuccess:false}
        
        case USER_UPDATE_GET_SUCCESS:
            return { loading: false, loadedUpdatedProfile: action.payload, updateSuccess:true, success:true,}

        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload, success:false }

        case USER_UPDATE_RESET:
            return { }

        default:
            return state
    }
}


export const userGetReducer = (state = { }, action) => {

    switch (action.type){
        case GET_USER_REQUEST:
            return {loading: true, success:false}

        case GET_USER_SUCCESS:
            return { loading: false, alluser: action.payload, success:true}

        case GET_USER_FAIL:
            return {loading: false, error: action.payload, success:false }

        case GET_USER_RESET:
            return { }

        default:
            return state
    }
}