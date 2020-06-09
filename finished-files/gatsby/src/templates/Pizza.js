import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Grid from '../styles/Grids';

export default function PizzasPage({ pageContext, data: { pizza } }) {
  console.log(pizza);
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src}></SEO>
      <Grid style={{ '--columns': 2 }}>
        {pizza.image && <Img fluid={pizza.image.asset.fluid} />}
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map(topping => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </Grid>
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
