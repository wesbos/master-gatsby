import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;
