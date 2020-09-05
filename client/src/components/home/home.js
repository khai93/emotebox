import React, { useState, useEffect } from 'react'
import {AuthHelper, DiscordHelper} from "../../helpers"
import {Navbar, SearchBar, TagList} from '../shared'
import './home.css'

function Home() { 
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const userRes = await AuthHelper.getAuthenticatedUser();
            console.log(userRes)
            setUser(userRes);
        }

        // TODO: HANDLE THROWN ERROR IF IT COULD NOT GET THE USER
        fetchData()
    }, [])

    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar)
    const handleSearch = (e) => {
        e.preventDefault();
    }
    return (
        <div className="home__main">
            <Navbar userAvatar={userAvatar}></Navbar>
            <SearchBar handleClick={handleSearch}></SearchBar>
            <TagList />
            <h2>Hello {user.username}!</h2>
        </div>
    )
}

export default Home;