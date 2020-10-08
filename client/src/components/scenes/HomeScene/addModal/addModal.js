import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ApiHelper } from '../../../../helpers'
import { Tag } from '../../../shared'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import 'react-tabs/style/react-tabs.css';

import './addModal.css'

Modal.setAppElement(document.getElementById('root'))

function AddModal(props) {
    const [tags, setTags] = useState([]);
    const [connectedServers, setConnectedServers] = useState([]);

    const closeModal = props.closeModal;
    const addModalIsOpen = props.addModalIsOpen;
    const fetchSearchData = props.fetchSearchData;
    const setStartAt = props.setStartAt;
    let emoteData = props.emoteData;

    let discordBotInviteLink;

    const fetchDiscordInviteLink = async () => {
        discordBotInviteLink = await ApiHelper.getDiscordInviteLink();
    }

    fetchDiscordInviteLink();

    const serverOptionsElements = connectedServers.map(server => (
        <option value={server.id} key={server.id}>{server.name}</option>
    ));
    
    const openInviteLink = () => {
        closeModal();
        window.open(discordBotInviteLink, '_blank');
    }

    serverOptionsElements.push((
        <option onClick={() => openInviteLink()} key="addServer"> -- Connect a new Server -- </option>
    ))

    const tagsElements = tags.map(e => (
        <div className="addModal__tagCtn" key={e}>
            <Tag className="addModal__tag" tagName={e}></Tag>
        </div>
    ))

    const fetchConnectedServers = async () => {
        const servers = await ApiHelper.getDiscordConnectedServers();
        setConnectedServers(servers);
    }

    const addEmote = async () => {
        const guildOpts = document.getElementById('addModal__serversOpts');
        const selectedGuild = guildOpts.options[guildOpts.selectedIndex].value;
        const create = await ApiHelper.createEmojiInGuild(selectedGuild, emoteData._id);
        closeModal();
        fetchSearchData();
    }

    useEffect(() => {
        fetchConnectedServers();
        emoteData = props.emoteData;
        if (addModalIsOpen && emoteData.hasOwnProperty("tags") && emoteData.tags != tags) {
            setTags(props.emoteData.tags)
        }
    }, [props.emoteData, props.addModalIsOpen])

    return (
        <Modal 
            className="addModal"
            overlayClassName="addModalOverlay"
            isOpen={addModalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Modal"
        >
            <div className="addModal__exit">
                <button className="addModal_exitBtn" onClick={closeModal}><FontAwesomeIcon icon={faTimesCircle} /></button>
            </div>
            <Tabs className="addModal__tabs">
                <TabList>
                    <Tab>Main</Tab>
                    <Tab>Info</Tab>
                </TabList>
                <TabPanel>
                    <h2>Add {emoteData.name} to Server</h2>
                    <legend>Select Server</legend>
                    <select id="addModal__serversOpts">
                        { serverOptionsElements }
                    </select>
                    <br />
                    <button onClick={addEmote} className="addModal__submitBtn">Add Emote</button>
                </TabPanel>
                <TabPanel>
                    <p>{emoteData.name} has been added {emoteData.installs} times!</p>
                    <h2>Tags</h2>
                    { tagsElements }

                </TabPanel>
            </Tabs>
        </Modal>
    )
}

export default AddModal;