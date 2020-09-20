import React, { useState } from 'react'
import {Navbar} from '../shared'
import { CreateEmoteList } from "../createEmoteList"
import {DiscordHelper, ApiHelper} from "../../helpers"
import ImageUploader from "react-images-upload"
import './create.css'

function Create(props) { 
    const [pictures, setPictures] = useState([]);

    const user = props.user;
    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar);

    const fileContainerStyles = {
        backgroundColor: "transparent",
        margin: "0"
    }

    const buttonStyles = {
        color: "white",
        backgroundColor: "var(--purple)",
        padding: "10px 23px",
        borderRadius: "5px",
        fontSize: "16px",
    }

    const onDrop = picture => {
        setPictures([...pictures, picture])
    }

    return (
        <div className="create__main">
            <Navbar userAvatar={userAvatar}></Navbar>
            <ImageUploader
              fileContainerStyle={fileContainerStyles}
              buttonStyles={buttonStyles}
              buttonClassName="create__uploadBtn"
              buttonText="Upload Emotes"
              withLabel={false}
              withIcon={false}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
            />
            <CreateEmoteList></CreateEmoteList>
            
        </div>
    )
}

export default Create;