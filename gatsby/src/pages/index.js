import React from 'react';
import { graphql } from 'gatsby';

export default function HomePage({ data }) {
  if (!data.store) {
    return <p>No Hot Slices in your area</p>;
  }
  const { slicemasters, hotSlices } = data.store;
  return (
    <>
      <h2>Slicemasters On:</h2>
      {slicemasters.map(master => (
        <p key={master.name}>{master.name}</p>
      ))}
      <h2>In the Case</h2>
      {hotSlices.map(slice => (
        <p key={slice.name}>{slice.name}</p>
      ))}
    </>
  );
}

export const query = graphql`
  query {
    store: sanityStoreSettings(_id: { eq: "downtown" }) {
      slicemasters {
        name
      }
      hotSlices {
        name
      }
    }
  }
`;
