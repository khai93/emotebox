import React from 'react'

import { ApiHelper } from '../../../helpers/'

import "./searchResultItem.css"

function SearchResultItem(props) {
    const item = props.itemData;

 
    const link =  ApiHelper.getImageFromKey(item.imageKey);

    let content = <img className="searchResultItem__img" src={link} alt={`Image Of ${item.name}`} />;
    let packClass = "";
    
    if (item.hasOwnProperty("emotes")) {
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