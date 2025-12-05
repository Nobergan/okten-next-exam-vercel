import { TmdbVideo } from '@app/types/tmdb-video';
import { ApiFilmDetails } from '@app/models/api-film-details.model';
import { MediaType } from '@app/types/media.type';
import { ApiFilms } from '@app/models/api-films-response.model';
import { ApiGenresResponse } from '@app/models/api-genres-response.model';

const tmdbApiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_BASE_URL;

export const getTrendFilms = async (
  mediaType: MediaType
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/trending/${mediaType}/week?language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getGenresFilmsList = async (
  mediaType: MediaType
): Promise<ApiGenresResponse> => {
  return await fetch(
    `${baseUrl}/genre/${mediaType}/list?language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getMediaByType = async (
  mediaType: MediaType,
  page: number
): Promise<ApiFilms> => {
  const res = await fetch(
    `${baseUrl}/discover/${mediaType}?include_adult=false&include_video=false&language=uk-UK&page=${page}&sort_by=vote_count.desc&vote_average.gte=6&api_key=${tmdbApiKey}`,
    {
      next: { revalidate: 60 }
    }
  );
  return res.json();
};

export const getFilmDetails = async (
  mediaType: MediaType,
  filmId: number
): Promise<ApiFilmDetails> => {
  return await fetch(
    `${baseUrl}/${mediaType}/${filmId}?language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getFilmTrailer = async (
  mediaType: MediaType,
  filmId: number,
  lang: 'uk-UK' | 'en-US' = 'uk-UK'
): Promise<string | null> => {
  const url = `${baseUrl}/${mediaType}/${filmId}/videos?language=${lang}&api_key=${tmdbApiKey}`;

  try {
    const res = await fetch(url);
    const data: { results: TmdbVideo[] } = await res.json();

    if (!data.results?.length) return null;

    const video = pickVideo(data.results);

    return video ? `https://www.youtube.com/embed/${video.key}` : null;
  } catch {
    return null;
  }
};

export const searchFilms = async (
  query: string,
  page = 1
): Promise<ApiFilms> => {
  if (!query.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  return await fetch(
    `${baseUrl}/search/multi?query=${encodeURIComponent(query)}&page=${page}&language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

export const getFilmsByGenre = async (
  mediaType: MediaType,
  genreId: number,
  page = 1
): Promise<ApiFilms> => {
  return await fetch(
    `${baseUrl}/discover/${mediaType}?with_genres=${genreId}&page=${page}&language=uk-UK&api_key=${tmdbApiKey}`
  ).then((response: Response) => response.json());
};

const pickVideo = (videos: TmdbVideo[]): TmdbVideo | undefined =>
  videos.find((v) => v?.key && v.site === 'YouTube' && v.type === 'Trailer') ??
  videos.find((v) => v?.key && v.site === 'YouTube') ??
  videos.find((v) => !!v?.key);
