import { FormEvent } from 'react';
import './Search.scss';

export function SearchBar(){

    function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        
        // log search term
        const formData = new FormData(e.currentTarget)
        const searchTerm = formData.get('search')
        console.log(searchTerm)
    }

    return(
        <form className="search-form" onSubmit={onSubmit}>
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