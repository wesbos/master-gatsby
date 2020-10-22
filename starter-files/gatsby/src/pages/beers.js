import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerGridStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyled = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

function BeersPage({ data }) {
  return (
    <>
      <h2 className="center">
        We have {data.beers.nodes.length} beers available. Dine in only!
      </h2>
      <BeerGridStyled>
        {data.beers.nodes.map((beer) => {
          const rating = Math.round(beer.rating.average);
          // .
          return (
            <SingleBeerStyled key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p>
                {`⭐️`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐️`.repeat(5 - rating)}
                </span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyled>
          );
        })}
      </BeerGridStyled>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          reviews
          average
        }
      }
    }
  }
`;

export default BeersPage;
