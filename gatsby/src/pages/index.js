import React, { useState, useEffect } from 'react';
import ItemGrid from '../components/ItemGrid';
import Grid from '../styles/Grid';

const endpoint = `https://q8tcrnkv.api.sanity.io/v1/graphql/development/default`;

const gql = (parts, ...pieces) =>
  parts.map((part, i) => `${part}${pieces[i] || ''}`).join('');

function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();
  useEffect(function() {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            store: StoreSettings(id: "downtown") {
              slicemasters {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          console.log(res);
          throw new Error(res.errors[0].message);
        }
        setHotSlices(res.data.store.hotSlices);
        setSlicemasters(res.data.store.slicemasters);
      })
      .catch(err => {
        console.log('ohh shit');
        console.log(err);
      });
  }, []);
  return { hotSlices, slicemasters };
}

function CurrentlySlicing({ slicemasters }) {
  if (!slicemasters) return <p>Loading Slicemasters</p>;
  if (!slicemasters.length) return <p>No one is working right now</p>;
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p className="center">Standing by, ready to slice you up</p>
      <ItemGrid items={slicemasters} />
    </div>
  );
}

function HotSlices({ hotSlices }) {
  if (!hotSlices) return <p>Loading Hot Slices in your area</p>;
  if (!hotSlices.length) return <p>No Hot Slices in your area</p>;
  return (
    <div>
      <h2 className="center">
        <span className="mark">In the Case</span>
      </h2>
      <p className="center">Hot and by-the-slice right now. Run!</p>
      <ItemGrid items={hotSlices} />
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza in Hamilton.</h1>
      <p>Open 11am to 11pm every single day.</p>

      <Grid style={{ '--columns': 2, '--gap': '40px' }}>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </Grid>
    </div>
  );
}
