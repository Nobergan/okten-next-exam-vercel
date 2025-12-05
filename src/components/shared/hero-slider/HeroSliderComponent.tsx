import { type FC } from 'react';
import './HeroSliderComponent.css';
import { MediaSourceType } from '@app/types/media-source.type';
import { MediaType } from '@app/types/media.type';
import { getTrendFilms } from '@app/services/films-api.service';
import { ApiFilm } from '@app/models/api-film-response.model';
import { HeroSliderClient } from './HeroSliderClient';
import { SlideContent } from './SlideContent';
import { Thumbnail } from './Thumbnail';

type HeroSliderProps = {
  source: MediaSourceType;
  mediaType?: MediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
};

export const HeroSliderComponent: FC<HeroSliderProps> = async ({
  mediaType = 'movie',
  getGenreNames
}) => {
  const result = await getTrendFilms(mediaType);
  const films: ApiFilm[] = Array.isArray(result)
    ? result
    : (result?.results ?? []);

  if (!films?.length) {
    return (
      <div className='flex min-h-[30svh] items-center justify-center text-neutral-300'>
        Немає елементів для показу
      </div>
    );
  }

  const slides = films.map((film) => (
    <SlideContent
      key={film.id}
      film={film}
      mediaType={mediaType}
      getGenreNames={getGenreNames}
    />
  ));

  const thumbs = films.map((film) => (
    <Thumbnail key={`thumb-${film.id}`} film={film} />
  ));

  return <HeroSliderClient slides={slides} thumbs={thumbs} />;
};
