import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  /* Assign the rows based on the parent */
  grid-template-rows: subgrid;
  /* Take up three of the parent's rows */
  grid-row: span 3;
  h2,
  p {
    margin: 0;
  }
`;

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map(pizza => (
        <SinglePizza pizza={pizza}></SinglePizza>
      ))}
    </PizzaGridStyles>
  );
}

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>{pizza.name}</h2>
      </Link>
      <p>{pizza.toppings.map(topping => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid}></Img>
    </PizzaStyles>
  );
}
