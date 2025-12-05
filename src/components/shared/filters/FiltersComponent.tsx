import type { FC } from 'react';
import { createGenreNames } from '@app/utils/genres';
import { GenreFilterForm } from './GenreFilterForm';
import { BaseMediaType } from '@app/types/media.type';

type FiltersProps = {
  mediaType: BaseMediaType;
  selectedGenre: number | null;
};

export const FiltersComponent: FC<FiltersProps> = async ({
  mediaType,
  selectedGenre
}) => {
  const { genreMaps } = await createGenreNames();

  const genreMap = mediaType === 'tv' ? genreMaps.tv : genreMaps.movie;

  const options = Array.from(genreMap.entries()).map(([id, name]) => ({
    id,
    name
  }));

  return (
    <div className='flex justify-start py-4 sm:justify-center'>
      <div className='w-full max-w-[280px] sm:max-w-[320px]'>
        <GenreFilterForm
          options={options}
          selectedGenre={selectedGenre}
          mediaType={mediaType}
        />
      </div>
    </div>
  );
};
