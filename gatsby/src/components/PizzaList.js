import React from 'react';
import { Link } from 'gatsby';

export default function PizzaList({ pizzas }) {
  return (
    <ul>
      {pizzas.map(pizza => (
        <li key={pizza.id}>
          <Link to={`/pizza/${pizza.slug.current}`}>{pizza.name}</Link>
        </li>
      ))}
    </ul>
  );
}
