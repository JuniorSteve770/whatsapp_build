import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/02Sidebar/SideBar';
import Chat from './Components/04Chat/Chat';
import Login from './Components/00Landing/Login'
import {useStateValue } from "./Components/01Connects/StateProvider"

function App() {
  
  
  // Here is the google Authenticator
const [{user}, dispatch] = useStateValue();
          


  return (
    <div className="App">

      <h1>237 React Apps</h1>

    <div className = "Body_layer">
      {/* Here we display a screen according to the presence of a user or not */}
        
      {!user ? (
        <Login/>

      ):(

        <Router>
            <Sidebar/>
          <Switch>
            <Route path ="/romChats/:roomId">              
            <Chat/>
            </Route>
              <Route path ="/">
              <Chat/>
              </Route>
          </Switch>
        </Router>

         
      )}
    </div>
      
    </div>
  );
}

export default App;
