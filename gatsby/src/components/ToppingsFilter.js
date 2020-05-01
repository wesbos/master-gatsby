import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

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
    <div>
      <Link to="/pizzas">
        All
        {!activeTopping ? `🟡` : `⚪`}
      </Link>
      {sortedToppings.map(topping => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          {topping.name} ({topping.count})
          {topping.name === activeTopping ? `🟡` : `⚪`}
        </Link>
      ))}
    </div>
  );
}
