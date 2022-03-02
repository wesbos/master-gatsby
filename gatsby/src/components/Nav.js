import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';
// to add navigate, add import { Link, navigate } from 'gatsby';

// function goToSlicemasters() {
//   // 1. wait for two seconds
//   setTimeout(() => {
//     console.log('Go to slicers');
//     // replace: true will allow the user to click back and add to browser history
//     navigate('/slicemasters', { replace: true });
//   }, 2000);
//   // 2. change the page
// }

// adding injected CSS which are not global
const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translate&(-25%)
  }
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    /* "auto" takes up as much space as it needs */
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    /* 2rem = 20px x 2 from GlobalStyles */
    grid-gap: 2rem;
    align-items: center;
    text-align: center;
    margin-top: -6rem;
    list-style: none;
  }
  li {
    /* prettierignore*/
    --rotate: -2deg;
    /* rotate creates a new variable, which can be called on li:nth-child(1) as --rotate: **deg;*/
    transform: rotate(var(--rotate));
    order: 1;
      /* grabs the first li and will not affect the rest of the li on the page */
    &:nth-child(1) {
      --rotate: 1deg;
    }
      /* grabs the second li and will not affect the rest of the li on the page... and so on */
    &:nth-child(2) {
      -- rotate: -2.5deg
    }
    &:nth-child(4) {
      -- rotate: 2.5deg
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
    /* Make the page you are on red in the nav to show that's where you are */
    ${'' /* &[aria-current="page"] {
      color: var(--red);
    } */}
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
        {/* <button type="button" onClick={goToSlicemasters}>
          Click me to see slicemasters after 2 seconds
        </button> */}
        <li>
          {/* prettierignore */}
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="/orders">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
