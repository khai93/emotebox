import React, { useState, useEffect } from 'react'
import { CreateEmoteItem } from '../createEmoteItem'
import { ApiHelper } from '../../helpers'

import './createEmoteList.css'

function CreateEmoteList(props) {
    const [userEmotes, setUserEmotes] = useState([]);
    const user = props.user;
    const setEditEmote = props.setEditEmote;
    
    

    useEffect(() => {
        async function fetchUserEmotes() {
            const userEmotesData = await ApiHelper.getEmotesByCreator(1);
            setUserEmotes(userEmotesData);
        }

        fetchUserEmotes()
    }, [])

    const emotesList = userEmotes.map( r => <CreateEmoteItem setEditEmote={setEditEmote} itemData={r} key={r._id} />)

    return (
        <div className="createList__ctn">
            <h1>EDIT EMOTES</h1>
            {
                emotesList
             }
        </div>
    )
}

export default CreateEmoteList