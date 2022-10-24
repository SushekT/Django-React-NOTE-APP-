import {
    COLLABORATION_REQUEST,
    COLLABORATION_SUCCESS,
    COLLABORATION_FAIL,
    COLLABORATION_RESET,

    PERMISSION_REQUEST,
    PERMISSION_SUCCESS,
    PERMISSION_RESET,
    PERMISSION_FAIL
} from './collaboration.types'


export const collaboratorReducer = (state = { }, action) => {

    switch (action.type){
        case COLLABORATION_REQUEST:
            return {loading: true, success:false}

        case COLLABORATION_SUCCESS:
            return { loading: false, collaboratorData: action.payload, success:true }

        case COLLABORATION_FAIL:
            return {loading: false, error: action.payload, success:false}

        case COLLABORATION_RESET:
            return {}

        default:
            return state
    }
 }


 export const permissionReducer = (state = { }, action) =>{
    switch (action.type){
        case PERMISSION_REQUEST:
            return {loading: true, success:false}

        case PERMISSION_SUCCESS:
            return { loading: false, permissionData: action.payload, success:true }

        case PERMISSION_FAIL:
            return {loading: false, error: action.payload, success:false}

        case PERMISSION_RESET:
            return {}

        default:
            return state
    }
 }