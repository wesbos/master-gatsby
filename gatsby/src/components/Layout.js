import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';
import 'normalize.css';
import Footer from './Footer';

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 4rem auto;
  background: white url(${stripes});
  background-size: 80em;
  padding: 3rem;
`;

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Typography></Typography>
      <SiteBorderStyles>
        <ContentStyles>
          <Nav></Nav>
          {children}
          <Footer></Footer>
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}
