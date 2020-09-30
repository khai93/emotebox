import React, { useState, useEffect } from 'react'
import {NavBar} from '../../../shared'
import { CreateEmoteList } from "../createEmoteList"
import { EditModal } from "../editModal"
import {DiscordHelper, ApiHelper} from "../../../../helpers"
import ImageUploader from 'react-images-upload-demo/src/component/compiled'
import './create.css'

function Create(props) { 
    const [editModalIsOpen, setIsOpen] = useState(false)
    const [editEmote, setEditEmoteState] = useState({});
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

    async function onDrop (pics) {
        // upload all pictures
        for(const pic of pics) {
            const uploaded = await ApiHelper.uploadEmote(pic);
        }

        fetchUserEmotes();
    }
    
    
    useEffect(() => {
        fetchUserEmotes()
    }, [user])
    
    return (
        <div className="create__main">
            <NavBar userAvatar={userAvatar} />
            <ImageUploader
              fileContainerStyle={fileContainerStyles}
              buttonStyles={buttonStyles}
              buttonClassName="create__uploadBtn"
              buttonText="Upload Emotes"
              withLabel={false}
              withIcon={false}
              keepState={false}
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