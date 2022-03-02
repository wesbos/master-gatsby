import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

// children passes props
export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
