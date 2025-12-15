import { FormEvent, useRef } from 'react';
import { SearchResults } from './SearchResults';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useSearch } from '@/hooks/useSearch';
import type { LocationSearchResult } from '@/types';
import './Search.scss';

interface Props {
  onLocationSelect: (lat: number, lon: number) => void;
  onSearchError: (hasError: boolean) => void;
}

export function SearchBar({ onLocationSelect, onSearchError }: Props){
    const {
        query,
        setQuery,
        results,
        isLoading,
        showResults,
        setShowResults,
        selectedIndex,
        handleKeyDown,
        resetSearch
    } = useSearch({ onSearchError });
    
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(searchContainerRef, () => setShowResults(false));

    function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (results.length > 0) {
            const indexToSelect = selectedIndex >= 0 ? selectedIndex : 0;
            handleSelect(results[indexToSelect]);
        }
        (document.activeElement as HTMLElement)?.blur();
    }

    const handleSelect = (location: LocationSearchResult) => {
        onLocationSelect(location.latitude, location.longitude);
        resetSearch();
    };

    return(
        <div className="search-container-wrapper" ref={searchContainerRef}>
            <form className="search-form" onSubmit={onSubmit}>
                <div className="search-bar-container">
                    <div className="search-icon">
                        <img src="/images/icon-search.svg" alt="magnifying glass icon" />
                    </div>
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder='Search for a place...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                </div>
                <button type="submit">
                    Search
                </button>
            </form>
            {showResults && (
                <SearchResults 
                    results={results} 
                    isLoading={isLoading} 
                    onSelect={handleSelect}
                    selectedIndex={selectedIndex}
                />
            )}
        </div>
    )
}