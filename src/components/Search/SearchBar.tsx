import { FormEvent, useState, useRef, useEffect } from 'react';
import { searchLocations, LocationSearchResult } from '@/api/geocodingApi';
import { SearchResults } from './SearchResults';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import './Search.scss';

interface Props {
  onLocationSelect: (lat: number, lon: number) => void;
  onSearchError: (hasError: boolean) => void;
}

export function SearchBar({ onLocationSelect, onSearchError }: Props){
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<LocationSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(searchContainerRef, () => setShowResults(false));

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                setShowResults(true);
                const locations = await searchLocations(query);
                setResults(locations);
                setSelectedIndex(-1);
                setIsLoading(false);
                
                if (locations.length === 0) {
                    onSearchError(true);
                } else {
                    onSearchError(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
                onSearchError(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearchError]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        }
    };

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
        setQuery('');
        setShowResults(false);
        setResults([]);
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