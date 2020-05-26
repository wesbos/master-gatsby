import React from 'react';
import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;
const Slicemaster = styled.div`
  .gatsby-image-wrapper {
    height: 400px;
  }
  a {
    text-decoration: none;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
  }
`;

export default function SlicemastersPage({
  pageContext,
  data: { slicemasters },
}) {
  return (
    <>
      <SEO title={`Slicemasters — Page ${pageContext.currentPage || 1}`}></SEO>
      <Pagination
        perPage={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <hr />
      <SlicemasterGrid>
        {slicemasters.nodes.map(person => (
          <Slicemaster key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
              <GatsbyImage fluid={person.image.asset.fluid} />
              <div className="description">{person.description}</div>
            </Link>
          </Slicemaster>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query SliceMasters($skip: Int! = 0, $pageSize: Int! = 4) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
