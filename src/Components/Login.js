import React, { useState } from 'react';
import './LoginandSignup.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import pictureplacelogo2 from '../assets/pictureplacelogo2.png';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

        })
        .catch((error) => {
            if (error) {
                alert("Wrong email or password")
            }
            console.log(error)
        });
    };

    return (
        <div className="login-signup-page">
            <div className="login-container">
                <div className="box-1">
                    <div className="box-1-logo">
                        <img src={pictureplacelogo2} alt="#" className="instagram-logo" />
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Phone number, username or email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
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
                    <div className="login-button-box">
                        <button 
                            className="login-button"
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="box-2">
                    <p>
                        Don't have an account? 
                        <span className="signup-button-span" onClick={() => props.onToggle("signup")}> Sign-Up</span>
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
        </div>
    )
}

export default Login;