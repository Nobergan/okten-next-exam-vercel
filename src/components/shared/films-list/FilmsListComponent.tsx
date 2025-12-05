import type { FC } from 'react';
import Link from 'next/link';

import {
  getMediaByType,
  getFilmsByGenre
} from '@app/services/films-api.service';
import {
  FILMS_LIST_MAX_PAGE_COUNT,
  PAGINATION_CLASSES,
  PAGINATION_LABELS
} from './constants';
import { MediaType, BaseMediaType } from '@app/types/media.type';
import { ApiFilms } from '@app/models/api-films-response.model';
import { ApiFilm } from '@app/models/api-film-response.model';
import { FilmCardComponent } from '@app/components/shared/film-card/FilmCardComponent';
import { FiltersComponent } from '@app/components/shared/filters/FiltersComponent';
import {
  buildPaginationHref,
  getPaginationNumbers
} from '@app/utils/pagination';

type FilmsListProps = {
  title: string;
  mediaType: BaseMediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
  page?: number;
  selectedGenre?: number | null;
};

export const FilmsListComponent: FC<FilmsListProps> = async ({
  title,
  mediaType = 'movie',
  getGenreNames,
  page = 1,
  selectedGenre
}) => {
  const currentPage = page > 0 ? page : 1;

  const response: ApiFilms = selectedGenre
    ? await getFilmsByGenre(mediaType, selectedGenre, currentPage)
    : await getMediaByType(mediaType, currentPage);

  const films: ApiFilm[] = response.results ?? [];
  const totalPagesRaw = response.total_pages ?? 1;
  const totalPages = Math.max(
    1,
    Math.min(totalPagesRaw, FILMS_LIST_MAX_PAGE_COUNT)
  );

  if (!films.length) {
    return (
      <section className='container mx-auto px-3 py-6'>
        <h2 className='mb-6 text-center text-2xl font-bold uppercase lg:text-[32px]'>
          {title}
        </h2>
        <div className='text-center text-gray-500'>
          Немає фільмів для показу.
        </div>
      </section>
    );
  }

  return (
    <section className='container mx-auto px-3 py-6'>
      {/* Separator */}
      <div className='mt-13 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />

      <h2 className='color:white mt-[24px] text-center text-2xl font-bold uppercase sm:mt-[40px] sm:mb-[0] lg:mt-[52px] lg:text-[54px]'>
        {title}
      </h2>

      <FiltersComponent
        mediaType={mediaType}
        selectedGenre={selectedGenre ?? null}
      />

      {/* Grid of films */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
        {films.map((film) => (
          <div key={film.id} className='group'>
            <Link href={`details/${mediaType}/${film.id}`} className='block'>
              <FilmCardComponent
                film={film}
                filmGenres={getGenreNames(
                  film.genre_ids as number[] | undefined,
                  mediaType as MediaType
                )}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center pt-3 pb-6 sm:pt-4 sm:pb-8 md:pt-5 md:pb-10'>
          <div className='flex w-full max-w-[375px] justify-center sm:max-w-[500px]'>
            <nav
              className={PAGINATION_CLASSES.container}
              aria-label='Pagination'
            >
              {/* Prev */}
              <Link
                href={buildPaginationHref(currentPage - 1, selectedGenre)}
                aria-disabled={currentPage === 1}
                className={[
                  PAGINATION_CLASSES.navLink,
                  currentPage === 1 ? PAGINATION_CLASSES.disabledLink : ''
                ].join(' ')}
              >
                {PAGINATION_LABELS.previous}
              </Link>

              {/* Page numbers */}
              {getPaginationNumbers(currentPage, totalPages).map(
                (item, idx) => {
                  if (item === 'ellipsis') {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className={PAGINATION_CLASSES.breakLink}
                      >
                        {PAGINATION_LABELS.break}
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={item}
                      href={buildPaginationHref(item, selectedGenre)}
                      aria-current={item === currentPage ? 'page' : undefined}
                      className={[
                        PAGINATION_CLASSES.pageLink,
                        item === currentPage
                          ? PAGINATION_CLASSES.activeLink
                          : ''
                      ].join(' ')}
                    >
                      {item}
                    </Link>
                  );
                }
              )}

              {/* Next */}
              <Link
                href={buildPaginationHref(currentPage + 1, selectedGenre)}
                aria-disabled={currentPage === totalPages}
                className={[
                  PAGINATION_CLASSES.navLink,
                  currentPage === totalPages
                    ? PAGINATION_CLASSES.disabledLink
                    : ''
                ].join(' ')}
              >
                {PAGINATION_LABELS.next}
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Separator */}
      <div className='mt-8 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)]' />
    </section>
  );
};

export default FilmsListComponent;
