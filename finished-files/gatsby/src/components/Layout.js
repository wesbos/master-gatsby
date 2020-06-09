import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';
import 'normalize.css';
import Footer from './Footer';
import SEO from './SEO';

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 80em;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
  border: 5px solid white;

  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const ContentStyles = styled.div`
  background: white;
  padding: 2rem;
`;

export default function Layout({ children, location }) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Typography></Typography>
      <SEO
        title="The Best Pizza"
        description="The Best Pizza in all of the world"
        location={location}
      ></SEO>
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
