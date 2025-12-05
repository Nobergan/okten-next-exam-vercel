import Image from 'next/image';
import Link from 'next/link';
import { NavLinks } from '@app/components/shared/nav-links/NavLinks';
import { FacebookIcon, TelegramIcon, InstagramIcon } from './icons';

export default function Footer() {
  return (
    <footer className='w-full bg-black text-white/90'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center gap-6 pt-[52px] pb-10 md:grid md:grid-cols-3 md:items-center md:gap-8'>
          {/* Logo */}
          <div className='flex w-full items-center justify-center md:justify-start'>
            <Link
              href='/'
              className='group inline-flex items-center gap-2'
              aria-label='На головну'
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

          {/* Socials */}
          <nav
            aria-label='Соціальні мережі'
            className='flex items-center justify-center gap-5'
          >
            <Link
              href='/'
              className='rounded-xl border border-white/15 p-3 transition-all hover:scale-105 hover:border-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none'
              aria-label='Facebook'
            >
              <FacebookIcon />
            </Link>
            <Link
              href='/'
              className='rounded-xl border border-white/15 p-3 transition-all hover:scale-105 hover:border-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none'
              aria-label='Telegram'
            >
              <TelegramIcon />
            </Link>
            <Link
              href='/'
              className='rounded-xl border border-white/15 p-3 transition-all hover:scale-105 hover:border-white/30 focus:ring-2 focus:ring-white/40 focus:outline-none'
              aria-label='Instagram'
            >
              <InstagramIcon />
            </Link>
          </nav>

          {/* Support */}
          <div className='flex w-full items-center justify-center md:justify-end'>
            <Link
              href='/'
              className='inline-flex items-center justify-center rounded-2xl border border-white/25 px-6 py-3 text-base font-medium text-white/90 transition-all hover:border-white hover:bg-white/5 focus:ring-2 focus:ring-white/40 focus:outline-none'
            >
              Напишіть нам
            </Link>
          </div>
        </div>

        {/* Nav links */}
        <NavLinks listClassName='pb-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[17px] text-white/85 md:text-lg' />

        {/* Divider */}
        <div className='mx-auto h-px w-11/12 bg-white/10' />

        {/* Copyright */}
        <div className='py-6'>
          <p className='text-center text-sm text-white/60'>
            © 2025 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
