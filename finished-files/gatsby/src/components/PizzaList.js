import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
  grid-auto-rows: auto auto 500px;
  @media (max-width: 1000px) {
    grid-auto-rows: unset;
  }
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);

  /* Take up three of the parent's rows */
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map(pizza => (
        <SinglePizza key={pizza.id} pizza={pizza}></SinglePizza>
      ))}
    </PizzaGridStyles>
  );
}

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map(topping => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid}></Img>
    </PizzaStyles>
  );
}
