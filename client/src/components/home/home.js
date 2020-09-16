import React, { useState, useEffect } from 'react'
import {AuthHelper, DiscordHelper} from "../../helpers"
import {Navbar, SearchBar, TagList, SearchResultList} from '../shared'
import './home.css'

function Home() { 
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const userRes = await AuthHelper.getAuthenticatedUser();
            setUser(userRes);
        }

        // TODO: HANDLE THROWN ERROR IF IT COULD NOT GET THE USER
        fetchData()
    }, [])

    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar)
    const handleSearch = (e, inputValue) => {
        e.preventDefault();
        console.log(inputValue)
    }

    const fetchSearchData = (input) => {
        
    }

    return (
        <div className="home__main">
            <Navbar userAvatar={userAvatar}></Navbar>
            <SearchBar handleSearch={handleSearch}></SearchBar>
            <TagList />
            <SearchResultList></SearchResultList>
        </div>
    )
}

export default Home;