import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';

export default function PizzasPage({ pageContext, data: { pizza } }) {
  return (
    <>
      <Helmet>
        <title>{pizza.name}</title>
      </Helmet>
      <div>
        <h2 className="mark">{pizza.name}</h2>
        {pizza.image && <Img fluid={pizza.image.asset.fluid} />}
        <ul>
          {pizza.toppings.map(topping => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

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
        vegetarian
        id
      }
    }
  }
`;
