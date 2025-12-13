import { useEffect, useRef } from 'react';
import { LocationSearchResult } from '@/api/geocodingApi';
import Loading from '../Loading';
import './SearchResults.scss';

interface Props {
  results: LocationSearchResult[];
  isLoading: boolean;
  onSelect: (location: LocationSearchResult) => void;
  selectedIndex: number;
}

export const SearchResults = ({ results, isLoading, onSelect, selectedIndex }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const list = listRef.current;
      const element = list.children[selectedIndex] as HTMLElement;
      
      if (element) {
        const { offsetTop, offsetHeight } = element;
        const { scrollTop, clientHeight } = list;
        
        // Check if element is above the visible area
        if (offsetTop < scrollTop) {
          console.log("The element is above the visible area of the list (needs to scroll up)")
          list.scrollTop = offsetTop;
        } 
        // Check if element is below the visible area
        else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
          console.log("The element is below the visible area of the list (needs to scroll down)")
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
    <ul className="search-results" ref={listRef}>
      {results.map((result, index) => (
        <li 
          key={result.id} 
          onClick={() => onSelect(result)}
          className={index === selectedIndex ? 'selected' : ''}
        >
          <span className="city-name">{result.name}</span>
          <span className="location-details">
            {result.admin1 ? `${result.admin1}, ` : ''}{result.country}
          </span>
        </li>
      ))}
    </ul>
  );
};
