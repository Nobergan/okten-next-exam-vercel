'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import './Header.css';
import { NavLinks } from '@app/components/shared/nav-links/NavLinks';
import { SearchFilmsList } from './search/SearchFilmsList';
import { SearchIcon, CloseIcon, ClearIcon } from './icons';
import { useSearch } from './search/useSearch';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    query,
    films,
    isFetching,
    isError,
    searchOpen,
    handleQueryChange,
    handleClearQuery,
    handleSearchToggle,
    handleClickSearchedFilm,
    shouldShowResults
  } = useSearch();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className='fixed inset-x-0 top-0 z-100 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60'>
      <div className='relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Left: Logo */}
        <div className='flex items-center'>
          <Link
            href='/'
            className='logo cursor-pointer'
            onClick={handleLinkClick}
          >
            <Image
              src='/assets/images/header/logo.png'
              width={500}
              height={500}
              alt='MixMovie'
              loading='eager'
              className='h-10 w-auto select-none'
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className='hidden md:flex' aria-label='Main'>
          <NavLinks
            listClassName='flex items-center gap-8'
            onItemClickAction={handleLinkClick}
          />
        </nav>

        {/* Right block */}
        <div className='flex items-center gap-3 sm:gap-4'>
          {/* Search button */}
          <button
            type='button'
            onClick={handleSearchToggle}
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white/80 transition hover:text-white focus:outline-none'
            aria-label={searchOpen ? 'Закрити пошук' : 'Відкрити пошук'}
          >
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </button>

          {/* Desktop avatar */}
          <Link
            href='/'
            className='hidden flex-col items-center text-white transition-opacity hover:opacity-90 sm:flex'
            onClick={handleLinkClick}
          >
            <Image
              src='/assets/images/header/empty-avatar.png'
              width={500}
              height={500}
              alt='Avatar'
              className='mb-1 h-10 w-10 rounded-full ring-1 ring-white/20'
            />
            <p className='text-xs font-medium tracking-wide'>Volodymyr</p>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className='flex h-8 w-8 flex-col items-center justify-center gap-[5px] text-gray-300 transition hover:text-white md:hidden'
            aria-label='Toggle menu'
          >
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search box */}
      {searchOpen && (
        <div className='relative z-100 mx-auto w-full max-w-2xl px-4 pb-4'>
          {/* Search input */}
          <form className='relative' role='search' aria-label='Пошук фільмів'>
            <input
              type='text'
              inputMode='search'
              placeholder='Пошук фільмів...'
              value={query}
              onChange={handleQueryChange}
              className='h-12 w-full rounded-full bg-white/10 pr-12 pl-5 text-[15px] text-white placeholder-white/60 ring-1 ring-white/10 transition outline-none focus:ring-2 focus:ring-white/25'
              autoComplete='off'
            />
            {query && (
              <button
                type='button'
                onClick={handleClearQuery}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-white/70 hover:text-white'
                aria-label='Очистити пошук'
              >
                <ClearIcon />
              </button>
            )}
          </form>

          {/* Searched films list */}
          {shouldShowResults && (
            <div className='absolute top-full right-0 left-0 z-100 mt-[-10px]'>
              <div className='z-100 max-h-[60vh] overflow-auto rounded-xl border border-white/10 bg-black/90 shadow-xl backdrop-blur'>
                {isFetching && (
                  <div className='p-4 text-sm text-white/70'>Завантаження…</div>
                )}

                {!isFetching && isError && (
                  <div className='p-4 text-sm text-red-300'>
                    Сталася помилка під час пошуку.
                  </div>
                )}

                {!isFetching && !isError && films.length > 0 && (
                  <SearchFilmsList
                    films={films}
                    onClick={handleClickSearchedFilm}
                    getGenreNames={() => ''}
                  />
                )}

                {!isFetching && !isError && films.length === 0 && (
                  <div className='p-4 text-sm text-white/70'>
                    Нічого не знайдено
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className='animate-fadeIn absolute inset-x-0 top-[72px] z-40 border-t border-white/10 bg-black/95 py-5 backdrop-blur-sm md:hidden'
          aria-label='Mobile'
        >
          <NavLinks
            listClassName='flex flex-col items-center gap-4'
            onItemClickAction={handleLinkClick}
          />

          <div className='mt-2'>
            <Link
              href='/'
              className='flex flex-col items-center text-white transition-opacity hover:opacity-90'
              onClick={handleLinkClick}
            >
              <Image
                src='/assets/images/header/empty-avatar.png'
                width={48}
                height={48}
                alt='Avatar'
                className='mb-1 h-12 w-12 rounded-full ring-1 ring-white/20'
              />
              <p className='text-sm font-medium tracking-wide'>Volodymyr</p>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
