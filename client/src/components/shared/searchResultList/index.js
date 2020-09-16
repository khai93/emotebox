import React, { useState } from 'react'
import SearchResultItem from '../searchResultItem'

import './searchResultList.css'

function SearchResultList(resultsData) {
    const [results, setResults] = useState(resultsData);

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