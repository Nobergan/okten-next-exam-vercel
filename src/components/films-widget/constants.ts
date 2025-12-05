import { Media } from '@app/constants/media.constant';
import { MediaSource } from '@app/constants/media-source.constant';

export const HOME_WIDGET_SECTIONS = [
  {
    key: 'trend-movies',
    title: 'Фільми в тренді',
    source: MediaSource.Trend
  },
  {
    key: 'trend-tv',
    title: 'Серіали в тренді',
    source: MediaSource.Trend,
    mediaType: Media.Tv
  },
  {
    key: 'popular-movies',
    title: 'Популярні фільми',
    source: MediaSource.Popular
  },
  {
    key: 'popular-tv',
    title: 'Популярні серіали',
    source: MediaSource.Popular,
    mediaType: Media.Tv
  },
  {
    key: 'upcoming',
    title: 'В очікуванні',
    source: MediaSource.Upcoming
  }
];
