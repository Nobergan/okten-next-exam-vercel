import debounce from 'lodash.debounce';
import type { Dispatch, SetStateAction } from 'react';

import { searchFilmsAction } from '@app/actions/search';
import type { ApiFilm } from '@app/models/api-film-response.model';

export interface SearchHandlers {
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setFilms: Dispatch<SetStateAction<ApiFilm[]>>;
}

const debouncedSearch = debounce(performSearch, 300);

async function performSearch(
  query: string,
  { setIsFetching, setIsError, setFilms }: SearchHandlers
): Promise<void> {
  setIsError(false);
  setIsFetching(true);

  try {
    const data = await searchFilmsAction(query);

    setFilms(data.results || []);
  } catch (error) {
    console.error('Failed to fetch films:', error);

    setIsError(true);
    setFilms([]);
  } finally {
    setIsFetching(false);
  }
}

export function searchFilmsWithDebounce(
  query: string,
  handlers: SearchHandlers
): void {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return;
  }

  void debouncedSearch(trimmedQuery, handlers);
}

export const cancelFilmsSearch = (): void => {
  debouncedSearch.cancel();
};
