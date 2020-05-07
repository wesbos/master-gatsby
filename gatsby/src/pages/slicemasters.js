import React from 'react';
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

const perPage = 2;
const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;
const Slicemaster = styled.div`
  .gatsby-image-wrapper {
    height: 400px;
  }
`;

export default function SlicemastersPage({
  pageContext,
  data: { slicemasters },
}) {
  return (
    <>
      <Pagination
        perPage={perPage}
        totalCount={slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <hr />
      <SlicemasterGrid>
        {slicemasters.nodes.map(person => (
          <Slicemaster key={person.id}>
            {person.name}
            <GatsbyImage fluid={person.image.asset.fluid} />
          </Slicemaster>
        ))}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query SliceMasters($skip: Int! = 0) {
    slicemasters: allSanityPerson(limit: 2, skip: $skip) {
      totalCount
      nodes {
        name
        id
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
