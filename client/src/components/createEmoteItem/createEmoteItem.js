import React from 'react'

import { TagList } from "../shared"
import { ApiHelper } from '../../helpers/'

import "./createEmoteItem.css"

function CreateEmoteItem(props) {
    const item = props.itemData;
    const link = ApiHelper.getImageFromKey(item.imageKey);

    let emoteImage = <img className="createListItem__img" src={link} alt={`Image Of ${item.name}`} />;
    
    const tags = item.tags.map(tag => {
        return (
            <p>{tag}</p>
        )
    })

    return (
        <div className="createListItem__outter">
            { emoteImage }
            <div className="createListItem__tags">
                { tags }
            </div>
        </div>
    )
}

export default CreateEmoteItem