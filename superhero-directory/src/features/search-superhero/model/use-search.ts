import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchSuperheros } from '../../../entities/superhero/api/search-superheros';
import { Superhero } from '../../../entities/superhero/superhero';

interface UseSearchResult {
  isLoading: boolean;
  error: string | null;
  heroes: Superhero[];
  search: (query: string) => void;
  searchQuery: string;
}

interface SearchResponse {
  results: Superhero[];
  'results-for': string;
}

const DEBOUNCE_DELAY = 300;

export function useSearch(): UseSearchResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const { data, isLoading, error } = useSearchSuperheros({
    query: debouncedQuery
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const heroes = (data as SearchResponse)?.results || [];

  return {
    isLoading,
    error: error?.message || null,
    heroes,
    search,
    searchQuery
  };
}