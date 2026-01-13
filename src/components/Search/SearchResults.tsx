import { useEffect, useRef } from 'react';
import Loading from '../Loading';
import type { LocationSearchResult } from '@/types';
import './SearchResults.scss';

interface Props {
  results: LocationSearchResult[];
  isLoading: boolean;
  onSelect: (location: LocationSearchResult) => void;
  selectedIndex: number;
}

export const SearchResults = ({ results, isLoading, onSelect, selectedIndex }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const list = listRef.current;
      const element = list.children[selectedIndex] as HTMLElement;
      
      if (element) {
        const { offsetTop, offsetHeight } = element;
        const { scrollTop, clientHeight } = list;
        
        // Check if element is above the visible area
        if (offsetTop < scrollTop) {
          list.scrollTop = offsetTop;
        } 
        // Check if element is below the visible area
        else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
          list.scrollTop = offsetTop + offsetHeight - clientHeight;
        }
      }
    }
  }, [selectedIndex]);

  if (isLoading) {
    return (
      <div className="search-results loading flex">
        <Loading />
        <p>Search in progress...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="search-results" ref={listRef}>
      {results.map((result, index) => (
        <button 
          key={result.id} 
          onClick={() => onSelect(result)}
          className={index === selectedIndex ? 'selected' : ''}
        >
          <span className="city-name">{result.name}</span>
          <span className="location-details">
            {result.admin1 ? `${result.admin1}, ` : ''}{result.country}
          </span>
        </button>
      ))}
    </div>
  );
};
