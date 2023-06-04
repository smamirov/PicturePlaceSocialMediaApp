import React, { useState } from 'react';
import pictureplacelogo2 from '../assets/pictureplacelogo2.png';
import './LoginandSignup.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup(props) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const signupHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, 
                    { 
                        displayName: userName
                    });
            })
            .catch((error) => {
                alert(error);
            });
        } else {
            alert("Password's Don't Match")
        }
    }

    return (
        <div className="login-container">
            <div className="box-1-signup">
                <div className="box-1-logo">
                    <img src={pictureplacelogo2} alt="#" className="instagram-logo" />
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="User Name"
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="login-button-box">
                    <button 
                        className="login-button"
                        onClick={signupHandler}
                    >
                        Signup
                    </button>
                </div>
            </div>
            <div className="box-2">
                <p>
                   Already have an account? 
                   <span className="login-button-span" onClick={() => props.onToggle("login")}> Log-In</span>
                </p>
            </div>
            {/*
            <div className="get-app-box">
                <p>
                    Get the app.
                </p>
            </div>
            <div className="app-store-google-play-box">
                
                <img src={appStoreImage} alt="#" className="app-store-image" />
                <img src={googlePlayImage} alt="#" className="google-play-image"/>
                
            </div>
            */}
        </div>
    )
}

export default Signup;