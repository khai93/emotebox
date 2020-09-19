import React, { useState, useEffect } from 'react'
import {Navbar} from '../shared'
import {DiscordHelper, ApiHelper} from "../../helpers"
import './create.css'

function Create(props) { 
    const user = props.user;
    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar);

    return (
        <div className="create__main">
            <Navbar userAvatar={userAvatar}></Navbar>
        </div>
    )
}

export default Create;