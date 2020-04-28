import React from "react"
import { graphql } from "gatsby";

export default function HomePage({ data: { store: { slicemasters, hotSlices }} }) {
  return (
  <div>
    <h2>Slicemasters On:</h2>
    {slicemasters.map(master => <p>{master.name}</p>)}
    <h2>In the Case</h2>
    {hotSlices.map(slice => <p>{slice.name}</p>)}
  </div>
  )
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


