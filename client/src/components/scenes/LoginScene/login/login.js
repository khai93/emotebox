import React from 'react';

import logo from '../../../../assets/logo.svg';

import './login.css';

import { SERVER_URL } from "../../../../api/api"


function Login() {

    const clickHandler = () => {
        window.location = `${SERVER_URL}/api/auth/discord`;
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