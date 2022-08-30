import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userForgetPasswordReducer, userGetReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer, userResetPasswordReducer } from './reducers/login/login.reducers'
import { noteCreateReducer, noteDetailDeleteReducer, noteDetailReducer, noteReducer, noteUpdateReducer } from './reducers/notes/notes.reducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    notes: noteReducer,
    noteDetails: noteDetailReducer,
    noteDetailsDelete: noteDetailDeleteReducer,
    noteCreate : noteCreateReducer,
    userForgetPassword: userForgetPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    userProfileUpdate: userProfileUpdateReducer,
    getAllUser: userGetReducer,
    
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
 JSON.parse(localStorage.getItem('userInfo')) : null

//  const notesFromStorage = localStorage.getItem('notes') ?
//  JSON.parse(localStorage.getItem('notes')) : null

const initialState = {
    userLogin: { userInfo : userInfoFromStorage },
    // notes: {notes: notesFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store