import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

const endpoint = `https://q8tcrnkv.api.sanity.io/v1/graphql/development/default`;

const gql = (parts, ...pieces) =>
  parts.map((part, i) => `${part}${pieces[i] || ''}`).join('');

function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  useEffect(function() {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            allPizza {
              name
              image {
                asset {
                  url
                }
              }
            }
          }
        `,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setHotSlices(data);
      });
  }, []);
  return { hotSlices };
}

export default function HomePage({ data }) {
  const { slicemasters, hotSlices } = data.store;
  const d = useLatestData();
  console.log(d);
  return (
    <>
      <h2>Hamilton's Best Pizza.</h2>
      <p className="hours">11am to 11pm Every Single Day.</p>
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
