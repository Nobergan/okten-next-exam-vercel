import { useState, useCallback, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import type { ApiFilm } from '@app/models/api-film-response.model';
import { searchFilmsWithDebounce, cancelFilmsSearch } from '@app/utils/search';

const MIN_QUERY_LENGTH = 4;

interface UseSearchReturn {
  query: string;
  films: ApiFilm[];
  isFetching: boolean;
  isError: boolean;
  searchOpen: boolean;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClearQuery: () => void;
  handleSearchToggle: () => void;
  handleClickSearchedFilm: (film: ApiFilm) => void;
  shouldShowResults: boolean;
}

export const useSearch = (): UseSearchReturn => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [films, setFilms] = useState<ApiFilm[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const resetSearchState = useCallback(() => {
    setQuery('');
    setFilms([]);
    setIsError(false);
    setIsFetching(false);
    cancelFilmsSearch();
  }, []);

  const handleClickSearchedFilm = useCallback(
    (film: ApiFilm) => {
      const mediaType = film.media_type === 'tv' ? 'tv' : 'movie';

      router.push(`/details/${mediaType}/${film.id}`);

      resetSearchState();
      setSearchOpen(false);
    },
    [router, resetSearchState]
  );

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => {
      const next = !prev;

      if (!next) {
        resetSearchState();
      }

      return next;
    });
  }, [resetSearchState]);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setQuery(value);

      const trimmed = value.trim();

      if (trimmed.length < MIN_QUERY_LENGTH) {
        cancelFilmsSearch();
        setFilms([]);
        setIsError(false);
        setIsFetching(false);

        return;
      }

      searchFilmsWithDebounce(trimmed, {
        setIsFetching,
        setIsError,
        setFilms
      });
    },
    []
  );

  const handleClearQuery = useCallback(() => {
    resetSearchState();
  }, [resetSearchState]);

  const shouldShowResults = query.trim().length >= MIN_QUERY_LENGTH;

  return {
    query,
    films,
    isFetching,
    isError,
    searchOpen,
    handleQueryChange,
    handleClearQuery,
    handleSearchToggle,
    handleClickSearchedFilm,
    shouldShowResults
  };
};
