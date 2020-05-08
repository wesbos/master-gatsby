import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    display: grid;
    padding: 5px;
    background: var(--grey);
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    text-decoration: none;
    align-items: center;
    border-radius: 2px;
    .count {
      background: rgba(255, 255, 255, 1);
      padding: 2px 5px;
      font-size: 1rem;
      border-radius: 2px;
    }
    &.active {
      background: var(--yellow);
    }
  }
`;

export default function ToppingsFilter({ activeTopping }) {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
      toppings: allSanityTopping {
        nodes {
          name
          vegetarian
          id
        }
      }
    }
  `);

  const toppingsWithCounts = pizzas.nodes
    .map(pizza => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.name];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // new topping, create it
        acc[topping.name] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});

  const sortedToppings = Object.values(toppingsWithCounts).sort(
    (a, b) => b.count - a.count
  );
  return (
    <ToppingStyles>
      <Link to="/pizzas" className={!activeTopping ? 'active' : ''}>
        All
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {sortedToppings.map(topping => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name} </span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
