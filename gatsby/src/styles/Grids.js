import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  grid-gap: var(--gap, 20px);
  grid-template-columns: repeat(var(--columns, 2), minmax(auto, 1fr));
  @media (max-width: 750px) {
    --columns: 1;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: var(--gap, 20px);
  grid-template-columns: repeat(autofill, minmax(200px, 1fr));
`;
export default Grid;
