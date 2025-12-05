export const buildPaginationHref = (
  pageNumber: number,
  selectedGenre?: number | null
): string => {
  const params = new URLSearchParams();

  params.set('page', String(pageNumber));

  if (selectedGenre) params.set('genre', String(selectedGenre));

  return `?${params.toString()}`;
};

export const getPaginationNumbers = (
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] => {
  const delta = 1;
  const range: number[] = [];
  const result: (number | 'ellipsis')[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((page, idx) => {
    if (idx > 0 && page - range[idx - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(page);
  });

  return result;
};
