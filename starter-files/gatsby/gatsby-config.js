import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizza place in town`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      // This is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'ax515n6d',
        dataset: 'production',
        watchmode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
