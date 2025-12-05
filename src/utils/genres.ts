import { Media } from '@app/constants/media.constant';
import type { MediaType } from '@app/types/media.type';
import type { ApiGenre } from '@app/models/api-genres-response.model';
import { getGenresFilmsList } from '@app/services/films-api.service';

type GenreMapByType = {
  movie: Map<number, string>;
  tv: Map<number, string>;
};

const mapGenresIdsToNames = (arr: ApiGenre[] = []) =>
  new Map(arr.map((g) => [g.id, g.name]));

export const createGenreNames = async () => {
  const [movieGenresRes, tvGenresRes] = await Promise.all([
    getGenresFilmsList(Media.Movie),
    getGenresFilmsList(Media.Tv)
  ]);

  const movieGenres = movieGenresRes?.genres ?? [];
  const tvGenres = tvGenresRes?.genres ?? [];

  const genreMaps: GenreMapByType = {
    movie: mapGenresIdsToNames(movieGenres),
    tv: mapGenresIdsToNames(tvGenres)
  };

  const getGenreNames = (
    ids: number[] | undefined,
    type?: MediaType
  ): string => {
    if (!ids?.length) return '';

    const map = type === Media.Tv ? genreMaps.tv : genreMaps.movie;

    return ids
      .map((id) => map.get(id))
      .filter(Boolean)
      .join(', ');
  };

  return { genreMaps, getGenreNames };
};
