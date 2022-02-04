import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import React, {useState} from "react";

import Header from './components/Header';
import NotePage from './pages/NotePage';
import Note from "./pages/Note";
import ThemeChanger from "./components/ThemeChanger";
import ThemeNightChanger from "./components/ThemeNight";

import './App.css';

function App() {

  let [theme, setTheme] = useState(false)
  console.log(theme)
  const changeTheme = () =>{
    setTheme(!theme)
    console.log('clicked')
  }
  return (
    <Router>
      <div className={`container ${theme ? "dark": ""}`}>
        <div className="app">
          <Header />
          <Route component={NotePage} path="/" exact/>
          <Route component={Note} path="/note/:id" />
          <div onClick={changeTheme}>
            {theme?
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
