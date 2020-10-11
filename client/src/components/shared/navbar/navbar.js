import React from 'react'
import { Avatar } from "../avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faBell } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../../api/api';
import logo from '../../../assets/logo.svg';
import "./navbar.css"

function Navbar(props) {
    const userAvatar = props.userAvatar;
    const logoutUrl = SERVER_URL + "/api/auth/signout";

    return (
        <nav>
            <div className="navbar__logo">
                <Link to="/home">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
            </div>
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <Link to="/create">
                        <FontAwesomeIcon className="navbar__icon" icon={faPlusSquare} />
                    </Link>
                </li>
                <li className="navbar__item">
                    <FontAwesomeIcon className="navbar__icon" icon={faBell} />
                </li>
                <li className="navbar__item navbar__avatar">
                    <Avatar userAvatar={userAvatar}></Avatar>
                    <div className="navbar__dropdownContent">
                        <a href={logoutUrl} className="navbar__dropdownLink">
                            Log Out
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;