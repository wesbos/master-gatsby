import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SlicemasterPage({ pageContext, data }) {
  return (
    <div className="center">
      <Img fluid={data.person.image.asset.fluid}></Img>
      <h2>
        <span className="mark">{data.person.name}</span>
      </h2>
      <p>{data.person.description}</p>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
