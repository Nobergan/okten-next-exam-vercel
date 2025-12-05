'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { BaseMediaType } from '@app/types/media.type';

type GenreFilterFormProps = {
  options: Array<{ id: number; name: string }>;
  selectedGenre: number | null;
  mediaType: BaseMediaType;
};

const SELECT_BASE_CLASSES =
  'block w-full appearance-none rounded-2xl border border-transparent bg-[#111315] px-4 py-3 text-[16px] font-semibold text-white outline-none focus:border-[#1f2937] focus:ring-2 focus:ring-[#1f2937] sm:text-[18px]';

export const GenreFilterForm: FC<GenreFilterFormProps> = ({
  options,
  selectedGenre
}) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams();

    params.set('page', '1');

    if (value) params.set('genre', value);

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    router.push('?page=1');
  };

  return (
    <div className='relative'>
      <select
        name='genre'
        value={selectedGenre?.toString() ?? ''}
        onChange={handleChange}
        className={`${SELECT_BASE_CLASSES} ${selectedGenre ? 'pr-20' : 'pr-10'}`}
      >
        <option value=''>Усі жанри</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>

      {selectedGenre && (
        <button
          type='button'
          onClick={handleClear}
          className='absolute inset-y-0 right-10 flex items-center px-2 text-gray-400 transition-colors hover:text-white'
          aria-label='Очистити жанр'
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </button>
      )}

      <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300'>
        <svg
          aria-hidden='true'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          className='opacity-80'
        >
          <path fill='currentColor' d='M7 10l5 5 5-5H7z' />
        </svg>
      </span>
    </div>
  );
};
