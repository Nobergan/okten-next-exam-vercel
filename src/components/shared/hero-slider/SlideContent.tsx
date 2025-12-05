import { type FC } from 'react';
import Link from 'next/link';
import { ApiFilm } from '@app/models/api-film-response.model';
import { MediaType } from '@app/types/media.type';
import { getDate, getImageUrl, getTitle } from '@app/utils/film-data';
import { StarIcon } from './icons';
import { GRADIENT_OVERLAYS } from './constants';

interface SlideContentProps {
  film: ApiFilm;
  mediaType: MediaType;
  getGenreNames: (genreIds: number[] | undefined, type?: MediaType) => string;
}

export const SlideContent: FC<SlideContentProps> = ({
  film,
  mediaType,
  getGenreNames
}) => {
  const gradientClasses = `${GRADIENT_OVERLAYS.mobile} ${GRADIENT_OVERLAYS.tablet} ${GRADIENT_OVERLAYS.desktop}`;

  return (
    <div className='relative h-full w-full'>
      <img
        src={getImageUrl(film.backdrop_path, 'original')}
        alt={getTitle(film)}
        className='absolute inset-0 h-full w-full object-cover'
      />

      {/* Separator */}
      <div className={`absolute inset-0 ${gradientClasses}`} />

      {/* Content block */}
      <div className='absolute inset-0 flex flex-col justify-end sm:justify-center'>
        <div className='max-w-full px-4 pb-[5.5rem] text-white select-none sm:max-w-[42rem] sm:pb-[7rem] sm:pl-[8%] md:pb-[8rem] md:pl-[10%] lg:max-w-[46rem]'>
          <h1 className='xs:text-3xl line-clamp-2 text-2xl font-extrabold tracking-tight uppercase drop-shadow-xl sm:text-4xl md:text-6xl'>
            {getTitle(film)}
          </h1>

          <div className='mt-3 flex flex-wrap items-center gap-2 text-neutral-200/90 sm:mt-4 sm:gap-3'>
            <span className='inline-flex items-center gap-1.5 text-base sm:text-lg'>
              <StarIcon />
              {typeof film.vote_average === 'number'
                ? film.vote_average.toFixed(1)
                : ''}
            </span>

            <span className='opacity-60'>•</span>
            <span className='line-clamp-1 text-xs sm:text-sm md:text-base'>
              {getGenreNames(film.genre_ids as number[] | undefined, mediaType)}
            </span>

            <span className='opacity-60'>•</span>
            <span className='text-xs sm:text-sm md:text-base'>
              {getDate(film)}
            </span>
          </div>

          <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-200 sm:mt-5 sm:line-clamp-4 sm:text-base md:text-lg'>
            {film.overview ?? ''}
          </p>

          <Link
            href={`/details/${film.media_type ?? mediaType}/${film.id}`}
            className='mt-4 inline-flex cursor-pointer items-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold shadow-lg transition-colors hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 active:bg-red-600 sm:mt-6 sm:px-7 sm:py-3.5 sm:text-base'
          >
            Дивитись
          </Link>
        </div>
      </div>
    </div>
  );
};
