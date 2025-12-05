import { type FC } from 'react';
import Image from 'next/image';
import { ApiFilm } from '@app/models/api-film-response.model';
import { getImageUrl, getTitle } from '@app/utils/film-data';

interface ThumbnailProps {
  film: ApiFilm;
}

export const Thumbnail: FC<ThumbnailProps> = ({ film }) => (
  <div className='relative h-full w-full overflow-hidden rounded-md ring-1 ring-white/10'>
    <Image
      src={getImageUrl(film.backdrop_path, 'w300')}
      alt={getTitle(film)}
      fill
      sizes='(max-width: 768px) 100vw, 300px'
      className='object-cover'
    />
  </div>
);
