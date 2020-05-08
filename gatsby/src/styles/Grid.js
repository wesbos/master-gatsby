import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-gap: var(--gap, 20px);
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
`;

export default Grid;
