import React from 'react';
import styled from 'styled-components';
import Grid from '../styles/Grid';

const Item = styled.div`
  text-align: center;
  img {
    height: auto;
    font-size: 0;
  }
  p {
    margin: 0;
    background: var(--yellow);
    display: inline-block;
    padding: 2px;
    transform: rotate(-2deg) translateY(50%);
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    background-image: linear-gradient(
      90deg,
      var(--grey) 0px,
      var(--shine) 40px,
      var(--grey) 80px
    );
    background-size: 500px;
    width: 100%;
    animation: shine 1s infinite linear;
  }
`;

export function LoadingGrid({ count }) {
  return (
    <Grid style={{ '--gap': '20px' }}>
      {Array.from({ length: count }, (_, i) => (
        <Item key={i}>
          <p className="mark">Loading...</p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            width="500"
            height="400"
            alt="Loading..."
          />
        </Item>
      ))}
    </Grid>
  );
}

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
