import { FilmsListComponent } from '@app/components/shared/films-list/FilmsListComponent';
import { HeroSliderComponent } from '@app/components/shared/hero-slider/HeroSliderComponent';
import { Media } from '@app/constants/media.constant';
import { MediaSource } from '@app/constants/media-source.constant';
import { createGenreNames } from '@app/utils/genres';
import { FilterPersistence } from '@app/components/shared/filters/FilterPersistence';
import { restoreSavedFilters } from '@app/utils/filters';
import { Suspense } from 'react';
import { Loader } from '@app/components/shared/Loader';

type PageSearchParams = {
  page?: string;
  genre?: string;
};

type PageProps = {
  searchParams: Promise<PageSearchParams>;
};

const MoviesPage = async ({ searchParams }: PageProps) => {
  const { page, genre } = await searchParams;

  await restoreSavedFilters({ page, genre }, 'movie', '/movies');

  const pageNumber = Number(page) || 1;
  const selectedGenre = genre ? Number(genre) : null;

  const { getGenreNames } = await createGenreNames();

  return (
    <>
      <FilterPersistence mediaType='movie' />
      <Suspense fallback={<Loader />}>
        <HeroSliderComponent
          source={MediaSource.Popular}
          mediaType={Media.Movie}
          getGenreNames={getGenreNames}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <FilmsListComponent
          title='Популярні фільми'
          mediaType='movie'
          getGenreNames={getGenreNames}
          page={pageNumber}
          selectedGenre={selectedGenre}
        />
      </Suspense>
    </>
  );
};

export default MoviesPage;
