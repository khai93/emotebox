import React, { useState } from 'react'
import SearchResultItem from '../searchResultItem'

import './searchResultList.css'

function SearchResultList() {
    const dummyResults = [
        {
            id: 1,
            name: "Weird",
            pack: true
        },
        {
            id: 2,
            name: "Twitch",
            pack: true
        },
        {
            id: 5,
            name: "Doge",
            pack: true
        },
        {
            id: 6,
            name: "Neutral",
            pack: false,
            imageLink: "https://cdn.shopify.com/s/files/1/1061/1924/products/Neutral_Face_Emoji_grande.png?v=1571606037"
        },
        {
            id: 7,
            name: "SeemsGood",
            pack: false,
            imageLink: "https://p7.hiclipart.com/preview/281/202/330/dota-2-twitch-emote-streaming-media-fortnite-twitch-subscribe-thumbnail.jpg"
        },
        {
            id: 8,
            name: "cmonBruh",
            pack: false,
            imageLink: "https://p7.hiclipart.com/preview/908/320/972/trihex-emote-twitch-fortnite-streaming-media-twitch-emotes.jpg"
        },
        {
            id: 9,
            name: "TriHard",
            pack: false,
            imageLink: "https://uploads-ssl.webflow.com/5e7a4fc9ae0f656f218a886a/5e950b9f29f10d6337314b40_trihard.png"
        }
    ];

    const [results, setResults] = useState(dummyResults);

    const resultList = results.map( r => <SearchResultItem itemData={r} />)

    return (
        <div className="searchResultList__ctn">
            {
                resultList
             }
        </div>
    )
}

export default SearchResultList