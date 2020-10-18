import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage = ({ data }) => {
  const { pizza } = data;

  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
};

// This needs to be dynamic based on the slug passed via context in gastby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

export default SinglePizzaPage;
