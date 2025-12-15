import { useState, useEffect, useCallback } from 'react';
import { searchLocations } from '@/api/geocodingApi';
import type { LocationSearchResult } from '@/types';

interface UseSearchProps {
    onSearchError: (hasError: boolean) => void;
}

export function useSearch({ onSearchError }: UseSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<LocationSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true);
                setShowResults(true);
                try {
                    const locations = await searchLocations(query);
                    setResults(locations);
                    setSelectedIndex(-1);
                    
                    if (locations.length === 0) {
                        onSearchError(true);
                    } else {
                        onSearchError(false);
                    }
                } catch (error) {
                    console.error("Search failed", error);
                    setResults([]);
                } finally {
                    setIsLoading(false);
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
        if (e.key === 'Escape') {
            setShowResults(false);
            return;
        }

        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        }
    };

    const resetSearch = useCallback(() => {
        setQuery('');
        setShowResults(false);
        setResults([]);
        setSelectedIndex(-1);
    }, []);

    return {
        query,
        setQuery,
        results,
        isLoading,
        showResults,
        setShowResults,
        selectedIndex,
        handleKeyDown,
        resetSearch
    };
}
