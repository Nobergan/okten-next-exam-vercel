export const NAV_LINKS = [
  { to: '/', label: 'Головна', end: true },
  { to: '/movies', label: 'Фільми', match: ['/movies', '/details/movie'] },
  { to: '/tv', label: 'Серіали', match: ['/tv', '/details/tv'] }
];
