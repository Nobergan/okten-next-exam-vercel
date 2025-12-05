'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from './constants';

type NavLinksProps = {
  listClassName?: string;
  onItemClickAction?: () => void;
};

export function NavLinks({ listClassName, onItemClickAction }: NavLinksProps) {
  const pathname = usePathname();

  const baseLink =
    'relative inline-flex items-center gap-2 px-2 py-1 text-base sm:text-lg tracking-wide transition-colors duration-200 cursor-pointer group';

  return (
    <ul className={listClassName}>
      {NAV_LINKS.map(({ to, label, match }) => {
        const isActive =
          pathname === to ||
          (to !== '/' && pathname.startsWith(to)) ||
          (match && match.some((m) => pathname.startsWith(m)));

        return (
          <li key={to}>
            <Link
              href={to}
              onClick={onItemClickAction}
              className={`${baseLink} ${
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-red-600 transition-all duration-200 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
