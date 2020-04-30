import React from 'react';
import { graphql } from 'gatsby';

// export default function HomePage({
//   data: {
//     store: { slicemasters },
//   },
// }) {
//   return (
//     <div>
//       {slicemasters.map(person => (
//         <p key={person.name}>{person.name}</p>
//       ))}
//     </div>
//   );
// }
export default function HomePage({
  data: {
    store: { slicemasters, hotSlices },
  },
}) {
  return (
    <>
      <h2>Slicemasters On:</h2>
      {slicemasters.map(master => (
        <p key={master.name}>{master.name}</p>
      ))}
      <h2>In the Case</h2>
      {hotSlices.map(slice => (
        <p key={slice.name}>{slice.name}:)</p>
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
