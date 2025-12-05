import { redirect } from 'next/navigation';
import {
  getFilmDetails,
  getFilmTrailer
} from '@app/services/films-api.service';
import {
  getDate,
  getGenres,
  getImageUrl,
  getRuntime,
  getTitle
} from '@app/utils/film-data';
import type { BaseMediaType } from '@app/types/media.type';
import { TrailerFallback } from '@app/components/details/TrailerFallback';
import { Media } from '@app/constants/media.constant';

type PageParams = {
  mediaType: string;
  id: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

const FilmDetailsPage = async ({ params }: PageProps) => {
  const { mediaType, id } = await params;
  const parsedId = Number(id);
  const isValidMedia = mediaType === 'movie' || mediaType === 'tv';

  if (!isValidMedia || Number.isNaN(parsedId) || parsedId <= 0) {
    redirect('/');
  }

  const validMediaType = mediaType as BaseMediaType;
  const isTv = validMediaType === Media.Tv;

  const [data, trailerUrl] = await Promise.all([
    getFilmDetails(validMediaType, parsedId),
    getFilmTrailer(validMediaType, parsedId)
  ]);

  if (!data) {
    return (
      <div className='container mx-auto px-3 py-6 text-center text-gray-500'>
        No details found.
      </div>
    );
  }

  return (
    <div className='container w-full text-white'>
      {/* Trailer */}
      <div className='z-[10] mt-[82px] px-3'>
        <div className='relative w-full overflow-hidden rounded-xl pb-[56.25%] shadow-xl ring-1 ring-white/10 sm:rounded-2xl'>
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title='Трейлер'
              loading='lazy'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='absolute top-0 left-0 h-full w-full'
            />
          ) : (
            <TrailerFallback
              title={getTitle(data)}
              isTv={isTv}
              backdropUrl={(() => {
                const path = data.backdrop_path || data.poster_path;
                return path ? getImageUrl(path) : '';
              })()}
            />
          )}
        </div>
      </div>

      {/* Title and Genres */}
      <div className='px-3 pt-5 sm:pt-8'>
        <div className='flex flex-wrap items-baseline gap-2 sm:gap-3'>
          <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl'>
            {getTitle(data)}
          </h1>
          {getDate(data) && (
            <span className='text-2xl font-medium text-neutral-400 sm:text-3xl md:text-4xl'>
              {getDate(data)}
            </span>
          )}
        </div>

        <div className='mt-2 text-base font-semibold text-white sm:mt-3 sm:text-xl md:text-2xl'>
          {getGenres(data)}
        </div>
      </div>

      {/* Content */}
      <div className='px-3 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-12'>
        <div className='grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2'>
          {/* Description */}
          <div>
            {data.overview ? (
              <p className='max-w-prose text-base leading-relaxed text-white/95 sm:text-lg sm:leading-[1.75]'>
                {data.overview}
              </p>
            ) : null}
          </div>

          {/* Info */}
          <div className='grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8 md:grid-cols-3'>
            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Рейтинг
              </div>
              <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                {typeof data.vote_average === 'number'
                  ? data.vote_average.toFixed(1)
                  : '—'}
              </div>
            </div>

            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Країна
              </div>
              <div className='text-l mt-2 whitespace-pre-line sm:mt-3 sm:text-xl'>
                {data.production_countries?.map((c) => c.name).join('\n') ||
                  '—'}
              </div>
            </div>

            {isTv ? (
              <>
                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Сезонів
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {data.number_of_seasons ?? '—'}
                  </div>
                </div>

                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Епізодів
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {data.number_of_episodes ?? '—'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Бюджет
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {typeof data.budget === 'number' && data.budget > 0
                      ? `${data.budget.toLocaleString('uk-UA')} $`
                      : '—'}
                  </div>
                </div>

                <div>
                  <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                    Тривалість
                  </div>
                  <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                    {getRuntime(data, validMediaType) ?? '—'}
                  </div>
                </div>
              </>
            )}

            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Студія
              </div>
              <div className='mt-2 text-lg whitespace-pre-line sm:mt-3 sm:text-xl'>
                {data.production_companies?.map((c) => c.name).join('\n') ||
                  '—'}
              </div>
            </div>

            <div>
              <div className='text-sm font-extrabold tracking-wide uppercase sm:text-base'>
                Статус
              </div>
              <div className='mt-2 text-lg sm:mt-3 sm:text-xl'>
                {data.status ?? '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className='mt-8 h-[2px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,#f80032_50%,rgba(0,0,0,0)_100%)] sm:mt-10' />
      </div>
    </div>
  );
};

export default FilmDetailsPage;
