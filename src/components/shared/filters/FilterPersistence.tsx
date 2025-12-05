'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { saveFilters } from '@app/actions/filters';
import { BaseMediaType } from '@app/types/media.type';

type FilterPersistenceProps = {
  mediaType: BaseMediaType;
};

export const FilterPersistence = ({ mediaType }: FilterPersistenceProps) => {
  const searchParams = useSearchParams();
  const lastSavedRef = useRef<string>('');

  const genre = searchParams.get('genre');
  const page = searchParams.get('page');

  const currentKey = useMemo(() => `${genre}-${page}`, [genre, page]);

  useEffect(() => {
    if (lastSavedRef.current === currentKey) return;

    lastSavedRef.current = currentKey;

    void saveFilters(mediaType, {
      genre: genre || undefined,
      page: page || undefined
    });
  }, [currentKey, mediaType, genre, page]);

  return null;
};
