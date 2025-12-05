import { getFilters } from '@app/actions/filters';
import { redirect } from 'next/navigation';
import { BaseMediaType } from '@app/types/media.type';

type SearchParams = {
  page?: string;
  genre?: string;
};

export const restoreSavedFilters = async (
  searchParams: SearchParams,
  mediaType: BaseMediaType,
  basePath: string
) => {
  const { page, genre } = searchParams;

  if (!page && !genre) {
    const savedFilters = await getFilters(mediaType);

    if (savedFilters && (savedFilters.genre || savedFilters.page)) {
      const params = new URLSearchParams();

      if (savedFilters.page) params.set('page', savedFilters.page);
      if (savedFilters.genre) params.set('genre', savedFilters.genre);

      redirect(`${basePath}?${params.toString()}`);
    }
  }
};
