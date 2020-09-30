import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import "./searchBar.css"

function SearchBar(props) {
    const [input, setInput] = useState("");
    const search = props.handleSearch; 
    
    return (
        <div className="searchBar__ctn">
            <form onSubmit={(e) => search(e, input)}>
                <div className="searchBar__formCtn">
                    <input className="searchBar__input" type="text" value={input} onChange={e => setInput(e.target.value)} name="emoteSearch"  required placeholder="Search for emotes, packs, tags.." ></input>
                    <FontAwesomeIcon className="searchBar__icon" icon={faSearch} />
                </div>    
                <input type="submit" style={{display:"none"}} ></input>
            </form>
        </div>
    )
}

export default SearchBar;