import React from 'react';
import styled from 'styled-components';
import Grid from '../styles/Grid';

const Item = styled.div`
  text-align: center;
  img {
    height: auto;
  }
  p {
    margin: 0;
    background: var(--yellow);
    display: inline-block;
    padding: 2px;
    transform: rotate(-2deg) translateY(50%);
  }
`;

export default function ItemGrid({ items }) {
  return (
    <Grid style={{ '--gap': '20px' }}>
      {items.map(item => (
        <Item key={item._id}>
          <p className="mark">{item.name}</p>
          <img
            width="500"
            height="400"
            style={{
              background: `url(${item.image.asset.metadata.lqip}`,
              backgroundSize: 'cover',
            }}
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt=""
          />
        </Item>
      ))}
    </Grid>
  );
}
