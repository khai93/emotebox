import React, { useState, useEffect } from 'react'
import {Navbar} from '../../../../shared'
import { CreateEmoteList } from "../createEmoteList"
import { EditModal } from ".."
import {DiscordHelper, ApiHelper} from "../../../../../helpers"
import ImageUploader from "react-images-upload"
import './create.css'

function Create(props) { 
    const [editModalIsOpen, setIsOpen] = useState(false)
    const [editEmote, setEditEmoteState] = useState({});
    const [uploadedEmotes, setUploadedEmotes] = useState([]);
    const [userEmotes, setUserEmotes] = useState([]);

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

    async function fetchUserEmotes() {
        const userEmotesData = await ApiHelper.getEmotesByCreator(user.id);
        setUserEmotes(userEmotesData);
        updateEditEmote(userEmotesData);
    }

    async function updateEditEmote(userEmotesData) {
        const editEmoteIndex = userEmotesData.findIndex(e => e._id == editEmote._id);

        if (editEmoteIndex !== -1) {
            setEditEmoteState(userEmotesData[editEmoteIndex]);
        }
    }

    async function onDrop (pics) {
        for(const pic of pics) {
            await ApiHelper.uploadEmote(pic);
        }

        this.clearPictures();

        fetchUserEmotes();
    }
    
    useEffect(() => {
        fetchUserEmotes()
    }, [user])

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
            <CreateEmoteList setEditEmote={setEditEmote} userEmotes={userEmotes} />
            <EditModal closeModal={closeModal} editModalIsOpen={editModalIsOpen} emoteData={editEmote} fetchUserEmotes={fetchUserEmotes} />
        </div>
    )
}

export default Create;