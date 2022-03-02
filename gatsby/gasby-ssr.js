// to make this server rendered This is a copy of gatsby-browser
import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  // props is a "spread element"
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}
