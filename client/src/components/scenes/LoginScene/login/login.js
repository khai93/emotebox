import React from 'react';

import logo from '../../../../assets/logo.svg';

import './login.css';

import { SERVER_URL } from "../../../../api/api"


function Login() {

    const clickHandler = () => {
        const authUrl = new URL("/api/auth/discord", SERVER_URL);

        const left = (window.screen.width / 2) - ((600 / 2) + 10);
        const top = (window.screen.height / 2) - ((800 / 2) + 50);
        
        const name = 'facebook_login';
        const specs = "width=600,height=800,resizable=yes,left="
        + left + ",top=" + top + ",screenX=" + left + ",screenY="
        + top + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
        window.open(authUrl.toString(), name, specs);
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