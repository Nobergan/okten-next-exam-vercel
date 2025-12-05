import { type FC } from 'react';
import FilmsWidgetClient from '@app/components/films-widget/FilmsWidgetClient';
import { FilmCardComponent } from '@app/components/shared/film-card/FilmCardComponent';
import { MediaSourceType } from '@app/types/media-source.type';
import { MediaType } from '@app/types/media.type';
import { getTrendFilms } from '@app/services/films-api.service';
import Link from 'next/link';

type FilmsWidgetProps = {
  title: string;
  source: MediaSourceType;
  mediaType?: MediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
};

export const FilmsWidgetComponent: FC<FilmsWidgetProps> = async ({
  title,
  mediaType = 'movie',
  getGenreNames
}) => {
  const result = await getTrendFilms(mediaType);
  const films = result?.results;

  if (!films?.length) {
    return (
      <section aria-label={title}>
        <h2 className='mt-[56px] text-2xl font-bold uppercase sm:mt-[72px] lg:mt-[52px] lg:text-[32px]'>
          {title}
        </h2>
        <div className='container mx-auto px-3 py-6 text-center text-gray-500'>
          Немає фільмів для показу.
        </div>
      </section>
    );
  }

  return (
    <FilmsWidgetClient title={title}>
      {films.map((film) => (
        <Link
          key={film.id}
          href={`/details/${mediaType}/${film.id}`}
          className='block'
        >
          <FilmCardComponent
            film={film}
            filmGenres={getGenreNames(film.genre_ids, mediaType)}
          />
        </Link>
      ))}
    </FilmsWidgetClient>
  );
};
