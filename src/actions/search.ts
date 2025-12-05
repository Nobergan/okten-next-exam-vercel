'use server';

import { ApiFilms } from '@app/models/api-films-response.model';
import { searchFilms } from '@app/services/films-api.service';

export async function searchFilmsAction(
  query: string,
  page: number = 1
): Promise<ApiFilms> {
  return await searchFilms(query, page);
}
