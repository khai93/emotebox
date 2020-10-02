import React, { useState, useEffect } from 'react'
import { CreateEmoteItem } from '../editModal/createEmoteItem'
import { ApiHelper } from '../../../../helpers'

import './createEmoteList.css'

function CreateEmoteList(props) {
    const userEmotes = props.userEmotes;
    const setEditEmote = props.setEditEmote;

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