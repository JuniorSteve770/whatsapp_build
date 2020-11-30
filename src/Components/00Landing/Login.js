import React from 'react';
import { Button } from '@material-ui/core';
import {auth, provider} from '../01Connects/firebase';
import "./Login.css";
import {useStateValue } from "../01Connects/StateProvider";
import {actionTypes} from "../01Connects/reducer"

function Login() {
    const [{}, dispatch ] = useStateValue();
// Here is the google Authentification
    const signIn = () =>{
     auth.signInWithPopup(provider).then(result =>{
            dispatch({
                type:actionTypes.SET_USER,
                user: result.user, 
            });
        })
        .catch((error) => alert(error.message));
        
    }

    return (
        <div className="login">
        <h2>Whatsapp clone 2020 </h2>
            <div className ="login_container">
                <img src="https://www.messengerpeople.com/wp-content/uploads/bfi_thumb/whatsapp-africa-32ilx9h511np7tuz88dwv959eto6oh605v6fxupc6hi35wei6.png" 
                        alt=""                    
                />
                <div className = "login_Text">
                    <h1>Sign in...</h1>
                </div>
                <Button onClick={signIn}>
                Sign in with Google..
                </Button>
            </div>
            
        </div>
    )
}

export default Login
