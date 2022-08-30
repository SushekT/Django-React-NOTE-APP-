import { 
    USER_NOTES_REQUEST,
    USER_NOTES_SUCCESS,
    USER_NOTES_FAIL,
    USER_NOTES_RESET,

    USER_NOTES_CREATE_REQUEST,
    USER_NOTES_CREATE_SUCCESS,
    USER_NOTES_CREATE_FAIL,
    USER_NOTES_CREATE_RESET,
 

    USER_NOTE_DETAIL_REQUEST,
    USER_NOTE_DETAIL_SUCCESS,
    USER_NOTE_DETAIL_FAIL,
    USER_NOTE_DETAIL_RESET,

    USER_NOTE_DETAIL_DELETE_REQUEST,
    USER_NOTE_DETAIL_DELETE_SUCCESS,
    USER_NOTE_DETAIL_DELETE_FAIL,
    USER_NOTE_DETAIL_DELETE_RESET


 } from './notes.types'

 const INITIAL_STATE = {
    loading : false,
    notes: [],
    success: false
 }

 export const noteReducer = (state = INITIAL_STATE, action) => {

    switch (action.type){
        case USER_NOTES_REQUEST:
            return {...state, loading: true, success:false}

        case USER_NOTES_SUCCESS:
            return { loading: false, notes: action.payload, success:true }

        case USER_NOTES_FAIL:
            return {loading: false, error: action.payload, success:false }

        case USER_NOTES_RESET:
            return{ loading: false, notes: '', success:false }

        default:
            return state
    }
 }

 export const noteDetailReducer = (state = { }, action) => {

    switch (action.type){
        case USER_NOTE_DETAIL_REQUEST:
            return {...state,loading: true, success:false }

        case USER_NOTE_DETAIL_SUCCESS:
            return { loading: false, noteDetail: action.payload, success:true }

        case USER_NOTE_DETAIL_FAIL:
            return {loading: false, error: action.payload, success:false }

        case USER_NOTE_DETAIL_RESET:
            return {loading: false, noteDetail: '',  success:false }

        default:
            return state
    }
 }

 export const noteDetailDeleteReducer = (state = INITIAL_STATE, action) => {

    switch (action.type){
        case USER_NOTE_DETAIL_DELETE_REQUEST:
            return {loading: true, success:false}

        case USER_NOTE_DETAIL_DELETE_SUCCESS:
            return { loading: false, noteDelete: action.payload, success:true }

        case USER_NOTE_DETAIL_DELETE_FAIL:
            return {loading: false, error: action.payload, success:false }

        case USER_NOTE_DETAIL_DELETE_RESET:
            return {noteDelete:'', }

        default:
            return state
    }
 }

 export const noteCreateReducer = (state = INITIAL_STATE, action) => {

    switch (action.type){
        case USER_NOTES_CREATE_REQUEST:
            return {...state, loading: true, success:false}

        case USER_NOTES_CREATE_SUCCESS:
            return { loading: false, notes: action.payload, success:true }

        case USER_NOTES_CREATE_FAIL:
            return {loading: false, error: action.payload, success:false }

        case USER_NOTES_CREATE_RESET:
            return{ loading: false, notes: '', success:false }

        default:
            return state
    }
 }