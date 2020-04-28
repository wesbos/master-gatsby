import React from 'react';
import { Link } from "gatsby";

export default function Nav() {
  return <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizzas</Link>
      </li>
      <li>
        <Link to="/slicemasters">Meet the Slicemasters</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead!</Link>
      </li>
    </ul>
  </nav>
}
