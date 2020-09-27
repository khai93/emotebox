import React, { useState, useEffect } from 'react'
import { SearchResultItem } from '../searchResultItem'

import './searchResultList.css'

function SearchResultList(props) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const resultsData = props.resultsData;
        setResults(resultsData);
    })

    const resultList = results.map( r => <SearchResultItem itemData={r} key={r._id} />)

    return (
        <div className="searchResultList__ctn">
            {
                resultList
             }
        </div>
    )
}

export default SearchResultList