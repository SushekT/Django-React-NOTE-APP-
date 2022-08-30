import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/Header';
import NotePage from './pages/NotePage';
import Note from "./pages/Note";
import Login from "./pages/Login";
import ThemeChanger from "./components/ThemeChanger";
import ThemeNightChanger from "./components/ThemeNight";

import './App.css';
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateProfile from "./pages/UpdateProfile";

function App() {

  let [theme, setTheme] = useState(false)

  useEffect(() =>{
    const themeStorage = localStorage.getItem('theme')?
    localStorage.getItem('theme') : false
    setTheme(JSON.parse(themeStorage))

  }, [])


  const changeTheme = () =>{
    setTheme(!theme)
    
    localStorage.setItem('theme', !theme)
    console.log(!theme)
  }
  const darkTheme = createTheme({
    palette: {
      mode: theme? 'dark': 'light',
    },
  });


  return (
    <Router>
      <div className={`container ${theme ? "dark": ""}`}>
        <div className="app">
          <Header />
          <ThemeProvider theme={darkTheme}>
            <Route component={Login} path="/" exact/>
            <Route component={Register} path="/register" exact/>
            <Route component={ForgotPassword} path="/forgot-password" exact/>
            <Route component={UpdateProfile} path='/update-profile' exact/>
            <Route component={NotePage} path="/note" exact/>
            <Route component={Note} path="/note/:id" />
            <Route component={ResetPassword} path='/password/reset/confirm/:uid/:token' exact/>
            <Route exact path='/activate/:uid/:token' component={Note} />
          </ThemeProvider>
          <div onClick={changeTheme}>
            {theme == 'true' || theme?
              <ThemeChanger  /> :
              <ThemeNightChanger />
            
            }
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
