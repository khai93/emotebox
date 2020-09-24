import React, { useState, useEffect } from 'react'
import {AuthHelper, DiscordHelper, ApiHelper} from "../../helpers"
import {Navbar, SearchBar, TagList} from '../shared'
import { SearchResultList  } from "../searchResultList"

import './home.css'


function Home(props) { 
    const user = props.user;
    const [results, setResults] = useState([]);

    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar)
    
    const handleSearch = (e, inputValue) => {
        e.preventDefault();
        fetchSearchData(inputValue);
    }

    const fetchSearchData = async (input) => {
        const emotes = await ApiHelper.searchEmotesByText(25, 0, input);
        const packs = await ApiHelper.searchPacksByText(25, 0, input);

        const merged = [...emotes, ...packs];

        merged.sort((a, b) => a.installs - b.installs);
        setResults(merged)
    }

    return (
        <div className="home__main">
            <Navbar userAvatar={userAvatar}></Navbar>
            <SearchBar handleSearch={handleSearch}></SearchBar>
            <TagList />
            <SearchResultList resultsData={results}></SearchResultList>
        </div>
    )
}

export default Home;