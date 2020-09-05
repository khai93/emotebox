import React from 'react'

import "./searchResultItem.css"

function SearchResultItem(props) {
    const item = props.itemData;
    return (
        <button className="searchResultItem__btn">
            { 
                item.name
            }
        </button>
    )
}

export default SearchResultItem