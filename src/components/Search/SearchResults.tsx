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
    <ul className="search-results">
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
