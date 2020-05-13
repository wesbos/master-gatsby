import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import Grid from '../styles/Grid';

const BeerStyles = styled.div`
  text-align: center;
  border: 1px solid var(--grey);
  padding: 2rem;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
`;

export default function BeersPage({ data }) {
  return (
    <>
      <SEO title="Our Beer List"></SEO>
      <h2 className="center">
        We have {data.beers.nodes.length} Beers Available. Dine in only.
      </h2>
      <Grid style={{ '--columns': 3 }}>
        {data.beers.nodes.map(beer => {
          const rating = Math.round(beer.rating.average);
          return (
            <BeerStyles id={beer.id}>
              <img src={beer.image} alt={beer.name} lazy />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} Stars out of 5`}>
                <span className="star starOn">{`⭐`.repeat(rating)}</span>
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <small className="count">({beer.rating.reviews})</small>
              </p>
            </BeerStyles>
          );
        })}
      </Grid>
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
          average
          reviews
        }
      }
    }
  }
`;
