import React from 'react';
import { Link } from 'gatsby';
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

export default function Nav() {
  return (
    <nav>
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
          <Link to="/">Logo</Link>
        </li>
        <li>
          <Link to="/slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="/orders">Order Ahead!</Link>
        </li>
      </ul>
    </nav>
  );
}
