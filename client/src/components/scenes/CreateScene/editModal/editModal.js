import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ApiHelper } from '../../../../helpers'
import { Tag } from '../../../shared'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import './editModal.css'

Modal.setAppElement(document.getElementById('root'))



function EditModal(props) {
    const [nameInput, setNameInput] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    const closeModal = props.closeModal;
    const editModalIsOpen = props.editModalIsOpen;
    let emoteData = props.emoteData;
    const fetchUserEmotes = props.fetchUserEmotes;

    let tagsElements;

    const editName = async () => {
        const res = await ApiHelper.editEmoteById(emoteData._id, nameInput);
        setNameInput("");
        fetchUserEmotes();
    }

    const addTag = async () => {
        const res = await ApiHelper.addEmoteTag(emoteData._id, tagInput);
        setTagInput("")
        fetchUserEmotes();
    }

    const deleteTag = async (tag) => {
        const res = await ApiHelper.removeEmoteTag(emoteData._id, tag);
        fetchUserEmotes();
    }

    const deleteEmote = async () => {
        const res = await ApiHelper.deleteEmoteById(emoteData._id);
        fetchUserEmotes();
        closeModal();
    }
    
    tagsElements = tags.map(e => (
        <div className="editModal__tagCtn" key={e}>
            <Tag className="editModal__tag" tagName={e}></Tag>
            <button onClick={() => deleteTag(e)} className="editModal__tagBtn">X</button>
        </div>
    ))

    useEffect(() => {
        emoteData = props.emoteData;

        if (editModalIsOpen && emoteData.hasOwnProperty("tags") && emoteData.tags != tags) {
            setTags(props.emoteData.tags)
        }
    }, [props.emoteData])

    return (
        <Modal 
            className="editModal"
            overlayClassName="editModalOverlay"
            isOpen={editModalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Modal"
        >
            <div className="editModal__exit">
                <button className="editModal_exitBtn" onClick={closeModal}>X</button>
            </div>
            <Tabs className="editModal__tabs">
                <TabList>
                    <Tab>General</Tab>
                    <Tab>Tags</Tab>
                </TabList>
                <TabPanel>
                    <h2>Edit Name For {props.emoteData.name}</h2>
                    <div className="editModal_inputCtn">
                        <input className="editModal__textInput" type="text" value={nameInput} onChange={e => setNameInput(e.target.value)}></input>
                        <button onClick={editName} className="editModal__submitBtn">Edit</button>
                    </div>
                    <button onClick={deleteEmote} className="editModal__deleteBtn">Delete Emote</button>
                </TabPanel>
                <TabPanel>
                    <h2>Edit Tags for {props.emoteData.name}</h2>
                    {tagsElements}
                    <div className="editModal_inputCtn">
                        <input className="editModal__textInput" type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}></input>
                        
                        <button onClick={addTag} className="editModal__submitBtn">Add</button>
                    </div>
                </TabPanel> 
            </Tabs>
        </Modal>
    )
}

export default EditModal