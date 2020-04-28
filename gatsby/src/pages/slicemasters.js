import React from 'react';
import { graphql } from 'gatsby';

export default function SlicemastersPage({ data }) {
  return <div>
    {data.slicemasters.nodes.map(person=> <li key={person.id}>
      {person.name}
    </li>)}
  </div>
}

export const query = graphql`
  query SliceMasters {
    slicemasters: allSanityPerson {
      nodes {
        name
        id
      }
    }
  }
`;
