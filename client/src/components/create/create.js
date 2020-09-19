import React, { useState, useEffect } from 'react'
import {Navbar} from '../shared'
import {DiscordHelper, ApiHelper} from "../../helpers"
import ImageUploader from "react-images-upload"
import './create.css'

function Create(props) { 
    const user = props.user;
    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar);
    const [pictures, setPictures] = useState([]);

    const onDrop = picture => {
        setPictures([...pictures, picture])
    }

    const fileContainerStyles = {
        "background-color": "transparent",
        "margin": "0"
    }

    const buttonStyles = {
        "color": "white",
        "background-color": "var(--purple)",
        "padding": "10px 23px",
        "border-radius": "5px",
        "font-size": "16px",

    }

    return (
        <div className="create__main">
            <Navbar userAvatar={userAvatar}></Navbar>
            <ImageUploader
              fileContainerStyle={fileContainerStyles}
              buttonStyles={buttonStyles}
              buttonClassName="create__uploadBtn"
              buttonText="Upload Emotes"
              label={false}
              withIcon={false}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
            />
        </div>
    )
}

export default Create;