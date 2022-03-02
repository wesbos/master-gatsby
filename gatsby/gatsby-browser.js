// this "wraps" / adds the layout to every page
// for this to work you have to kill the terminal and restart terminal with npm start
import React from 'react';
import Layout from './src/components/Layout';
// import global styles to the layout

export function wrapPageElement({ element, props }) {
  // props is a "spread element"
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
}
