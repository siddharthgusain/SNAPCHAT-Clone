import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './components/webcamcapture/WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Preview from './components/preview/Preview';
import Chats from './components/chats/Chats';
import ChatView from './components/chatView/ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser , login } from './features/appSlice';
import Login from './components/login/Login';
import { auth } from './firebase';


function App() {

    const user = useSelector(selectUser);
    const dispatch  = useDispatch();

    useEffect(()=>{

      auth.onAuthStateChanged((authUser) => {
      
        if(authUser){

          dispatch(login({
            
            username : authUser.displayName,
            profilePicture : authUser.photoURL,
            id: authUser.uid,
               
          }))

        }else{
          dispatch(logout());
        }
      })
    },[]);

    return (
      <div className="app">
        <Router>
          { !user
              ? ( <Login /> )
              : (  
              <div className="app_body">
                    <Switch>

                      <Route exact path="/">
                        <WebcamCapture />
                      </Route>

                      <Route path="/preview">
                        <Preview />
                      </Route>

                      <Route exact path="/chats">
                        <Chats />
                      </Route>

                      <Route path="/chats/view">
                        <ChatView />
                      </Route>
                     
                    </Switch>
              </div>
              )
          }
        
        </Router>
        
      </div>
    );

}

export default App;
