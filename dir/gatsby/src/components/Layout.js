import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';

export default function Layout({ children }) {
  return (
    <div>
      <link rel="stylesheet" href="./" />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
