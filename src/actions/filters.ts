'use server';

import { BaseMediaType } from '@app/types/media.type';
import { cookies } from 'next/headers';

type Filters = {
  genre?: string;
  page?: string;
};

// Action for saving filters to cookies
export async function saveFilters(mediaType: BaseMediaType, filters: Filters) {
  const cookieStore = await cookies();
  const key = `filters_${mediaType}`;

  cookieStore.set(key, JSON.stringify(filters), {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax'
  });
}

// Reading saved filters from cookies
export async function getFilters(
  mediaType: BaseMediaType
): Promise<Filters | null> {
  const cookieStore = await cookies();
  const key = `filters_${mediaType}`;
  const value = cookieStore.get(key)?.value;

  if (value) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  return null;
}
