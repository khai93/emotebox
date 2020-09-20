import React, { useState } from 'react'
import Tag from '../tag'

import './tagList.css'

function TagList(props) {
    const tagsProp = props.tags;

    const dummyTags = ["Funny", "Anime", "Weird", "Crying", "Meme", "Angry"]
   
    const [tags, setTags] = useState(dummyTags);

    if (typeof tagsProp != 'undefined') {
        setTags(tagsProp);
    }

    // TODO: add api request

    const tagList = tags.map(t => {
        return (
            <li key={t}>
                <Tag tagName={t} />
            </li>
        )
    }) 

    return (
        <ul className="taglist__list">
            {
                tagList
            }
        </ul>
    )
}

export default TagList