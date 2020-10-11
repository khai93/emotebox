import React from 'react';

import logo from '../../../../assets/logo.svg';

import './login.css';

import { SERVER_URL } from "../../../../api/api"


function Login() {

    const clickHandler = () => {
        window.location.href = new URL("/api/auth/discord", SERVER_URL);
    }

    return (
        <div className="login__container">
            <img src={logo} className="App-logo" alt="logo" />
            <button className="login__button" onClick={clickHandler}>
                Login With Discord
            </button>
        </div>
    )
}

export default Login