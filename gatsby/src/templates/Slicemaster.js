import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SlicemasterPage({ pageContext, data }) {
  return (
    <div>
      <h2>{data.person.name}</h2>
      <p>hey</p>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
