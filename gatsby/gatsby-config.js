const config = {
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'q8tcrnkv',
        dataset: 'development',
        token: process.env.MY_SANITY_TOKEN,
        watchMode: true,
      },
    },
  ],
};

export default config;
