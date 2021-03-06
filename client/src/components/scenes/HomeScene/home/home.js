import React, { useState, useEffect } from 'react'
import { DiscordHelper, ApiHelper } from "../../../../helpers"
import {NavBar, SearchBar, ProgressButton} from '../../../shared'
import { TagList } from '../tagList';
import { SearchResultList  } from "../searchResultList"
import { AddModal } from "../addModal"
import { BallBeat } from 'react-pure-loaders';

import './home.css'

function Home(props) { 
    const user = props.user;

    const [startAt, setStartAt] = useState(0);
    const [results, setResults] = useState([]);
    const [addModalIsOpen, setIsOpen] = useState(false)
    const [addEmote, setAddEmoteState] = useState({});
    const [searchInput, setSearchInput] = useState("Emote");
    const [loadingMore, setLoadingMore] = useState(false);

    const userAvatar = DiscordHelper.getAvatar(user.id, user.avatar)
    
    const handleSearch = (e, inputValue) => {
        if (e) {
            e.preventDefault();
        }

        fetchSearchData(inputValue, 0, []);
    }

    const fetchSearchData = async (input, startAtVar = startAt, resultsVar = results) => {
        if (input) {
            setSearchInput(input);
        }

        if (!input.replace(/\s/g,''))
            return;

        const fetched = await ApiHelper.searchEmotesByText(25, startAtVar*25, input);
        
        setStartAt(startAtVar);
        setResults(resultsVar);
            
        const emotes = [...resultsVar, ...fetched];

        setResults(emotes);
    }

    const fetchSearchInputData = (startAtVar) => {
        return fetchSearchData(searchInput, startAtVar);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const setAddEmote = (emote) => {
        setAddEmoteState(emote);
        openModal();
    }

    const showMoreEmotes = async () => {
        setStartAt(startAt+1);
        await fetchSearchInputData(startAt+1);
        setLoadingMore(false);
    }

    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight + (loadingMore ? -100 : 5);
    }

    const trackScrolling = () => {
        const listElement = document.getElementsByClassName('searchResultList__ctn')[0];
        if (isBottom(listElement)) {
            showMoreEmotes();
            window.removeEventListener('scroll', trackScrolling);
            setLoadingMore(true);
        }
    }

    useEffect(() => {
        fetchSearchInputData();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", trackScrolling);

        return function cleanup() {
            window.removeEventListener('scroll', trackScrolling);
        }
    });

    return (
        <div id="home__main" className="home__main">
            <NavBar userAvatar={userAvatar} />
            {
                searchInput != "Emote" ? (
                    <button id="home__resetBtn" className="home__resetBtn" onClick={(e) => {handleSearch(e, "Emote")}}>Reset search items</button>
                ) : null
            }
            <SearchBar handleSearch={handleSearch}></SearchBar>
            <TagList onTagClick={(input) => {fetchSearchData(input, 0, [])}}/>
            <SearchResultList resultsData={results} setAddEmote={setAddEmote}></SearchResultList>
            <AddModal emoteData={addEmote} closeModal={closeModal} addModalIsOpen={addModalIsOpen} fetchSearchData={fetchSearchInputData} setStartAt={setStartAt}/>
            <BallBeat
                color={'var(--purple)'}
                loading={loadingMore}
            />
        </div>
    )
}

export default Home;