import React from 'react'

import "./searchResultItem.css"

function SearchResultItem(props) {
    const item = props.itemData;

    let content = <img className="searchResultItem__img" src={item.imageLink} />;
    let packClass = "";
    
    if (item.pack) {
        content = item.name;
        packClass = "searchResultItem__pack";
    }
    
    return (
        <div className="searchResultItem__outter">
            <button className={"searchResultItem__btn " + packClass}>
                { 
                    content
                }
            </button>
        </div>
    )
}

export default SearchResultItem