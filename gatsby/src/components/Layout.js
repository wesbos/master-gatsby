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
  margin: 12rem auto 4rem auto;
  background: white url(${stripes});
  background-size: 80em;
  padding: 2.5rem;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;
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
