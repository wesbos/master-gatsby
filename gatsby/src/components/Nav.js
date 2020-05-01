import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  font-family: 'frenchFries';
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    text-align: center;
    list-style: none;
    align-items: center;
    grid-gap: 2rem;
    margin-top: -6rem;
  }
  .logo {
    margin-top: -8rem;
  }

  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
  }
  li:nth-child(1) {
    --rotate: 1.2deg;
  }
  li:nth-child(2) {
    --rotate: -2.5deg;
  }
  li:nth-child(4) {
    --rotate: 2.5deg;
  }
  li:hover {
    --rotate: 0deg;
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo></Logo>
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
