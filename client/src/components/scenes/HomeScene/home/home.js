import React, { useState, useEffect } from 'react'
import { DiscordHelper, ApiHelper } from "../../../../helpers"
import {NavBar, SearchBar} from '../../../shared'
import { TagList } from '../tagList';
import { SearchResultList  } from "../searchResultList"
import { AddModal } from "../addModal"

import './home.css'


function Home(props) { 
    const user = props.user;

    const [results, setResults] = useState([]);
    const [addModalIsOpen, setIsOpen] = useState(false)
    const [addEmote, setAddEmoteState] = useState({});
    

    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar)
    
    const handleSearch = (e, inputValue) => {
        e.preventDefault();
        fetchSearchData(inputValue);
    }

    const fetchSearchData = async (input) => {
        if (!input.replace(/\s/g,''))
            return;

        const emotes = await ApiHelper.searchEmotesByText(25, 0, input);

        setResults(emotes.sort((a, b) => a.installs - b.installs))
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const setAddEmote = (emote) => {
        console.log("hi");
        setAddEmoteState(emote);
        openModal();
    }

    return (
        <div className="home__main">
            <NavBar userAvatar={userAvatar} />
            <SearchBar handleSearch={handleSearch}></SearchBar>
            <TagList onTagClick={fetchSearchData}/>
            <SearchResultList resultsData={results} setAddEmote={setAddEmote}></SearchResultList>
            <AddModal emoteData={addEmote} closeModal={closeModal} addModalIsOpen={addModalIsOpen}/>
        </div>
    )
}

export default Home;