import React from 'react'

import { TagList } from "../../../shared"
import { ApiHelper } from '../../../../helpers'

import "./createEmoteItem.css"

function CreateEmoteItem(props) {
    const item = props.itemData;
    const setEditEmote = props.setEditEmote;
    const link = ApiHelper.getImageFromKey(item.imageKey);

    let emoteImage = <img className="createListItem__img" src={link} alt={`Image Of ${item.name}`} />;

    function openEditModal() {
        setEditEmote(item)
    }

    return (
        <div className="createListItem__outter" onClick={openEditModal}>
            { emoteImage }
        </div>
    )
}

export default CreateEmoteItem