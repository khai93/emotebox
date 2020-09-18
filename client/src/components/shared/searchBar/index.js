import React, {useState} from 'react'
import Icon from '@material-ui/core/Icon';
import "./searchBar.css"

function SearchBar(props) {
    const [input, setInput] = useState("");
    const search = props.handleSearch; 
    return (
        <div className="searchBar__ctn">
            <form onSubmit={(e) => search(e, input)}>
                <div className="searchBar__formCtn">
                    <input className="searchBar__input" type="text" value={input} onChange={e => setInput(e.target.value)} name="emoteSearch"  required placeholder="Search for emotes, packs, tags.." ></input>
                    <Icon className="searchBar__icon">search</Icon>
                </div>    
                <input type="submit" style={{display:"none"}} ></input>
            </form>
        </div>
    )
}

export {SearchBar as default}