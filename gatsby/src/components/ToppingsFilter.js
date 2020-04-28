import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

export default function ToppingsFilter({ activeTopping }) {
  const { toppings } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          vegan
          id
        }
      }
    }
  `);

  return (
    <div>
      <Link to="/pizzas">
        All
        {!activeTopping ? `🟡` : `⚪`}
      </Link>
      {toppings.nodes.map(topping => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          {topping.name}
          {topping.name === activeTopping ? `🟡` : `⚪`}
        </Link>
      ))}
    </div>
  );
}
