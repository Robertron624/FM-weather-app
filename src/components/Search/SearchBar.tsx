import './Search.scss';

export function SearchBar(){
    return(
        <form className="search-form">
            <div className="search-bar-container">
                <div className="search-icon">
                    <img src="/images/icon-search.svg" alt="magnifying glass icon" />
                </div>
                <input type="text" name="search" id="search" placeholder='Search for a place...'/>
            </div>
            <button type="submit">
                Search
            </button>
        </form>
    )
}