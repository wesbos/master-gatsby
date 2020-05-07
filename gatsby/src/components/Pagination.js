import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: grid;
  border: 1px solid var(--grey);
  align-content: center;
  align-items: center;
  justify-items: center;
  margin: 2rem 0;
  border-radius: 5px;
  display: flex;
  text-align: center;
  & > * {
    padding: 1rem;
    margin: 0;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current] {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  perPage,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / perPage);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link to={`${base}/${i > 0 ? i + 1 : ''}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next →
      </Link>
    </PaginationStyles>
  );
}
