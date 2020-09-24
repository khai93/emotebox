import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ApiHelper } from '../../helpers'
import { Tag } from '../shared'
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
    const emoteData = props.emoteData;

    if (editModalIsOpen && emoteData.hasOwnProperty("tags") && emoteData.tags != tags) {
        setTags(emoteData.tags)
    }

    let tagsElements;

    if (typeof tags != 'undefined') {
        tagsElements = tags.map(e => (
            <div className="editModal__tagCtn" key={e}>
                <Tag className="editModal__tag" tagName={e}></Tag>
                <button className="editModal__tagBtn">X</button>
            </div>
        ))
    }
    
    async function editName() {
        console.log(nameInput);
        
    }

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
                    <h2>Edit Name For {emoteData.name}</h2>
                    <div className="editModal_inputCtn">
                        <input className="editModal__textInput" type="text" value={nameInput} onChange={e => setNameInput(e.target.value)}></input>
                        <button onClick={editName} className="editModal__submitBtn">Edit</button>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Edit Tags for {emoteData.name}</h2>
                    {tagsElements}
                    <div className="editModal_inputCtn">
                        <input className="editModal__textInput" type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}></input>
                        
                        <button className="editModal__submitBtn">Add</button>
                    </div>
                </TabPanel> 
            </Tabs>
        </Modal>
    )
}

export default EditModal