import React, { useState } from 'react'
import {Navbar} from '../shared'
import { CreateEmoteList } from "../createEmoteList"
import { EditModal } from "../editModal"
import {DiscordHelper, ApiHelper} from "../../helpers"
import ImageUploader from "react-images-upload"
import './create.css'

function Create(props) { 
    const [editModalIsOpen, setIsOpen] = useState(false)
    const [pictures, setPictures] = useState([]);
    const [editEmote, setEditEmoteState] = useState({});

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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const setEditEmote = (emote) => {
        setEditEmoteState(emote);
        openModal();
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
            <CreateEmoteList setEditEmote={setEditEmote} />
            <EditModal closeModal={closeModal} editModalIsOpen={editModalIsOpen} emoteData={editEmote} />
        </div>
    )
}

export default Create;