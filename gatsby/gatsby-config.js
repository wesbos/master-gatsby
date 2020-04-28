module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'q8tcrnkv',
        dataset: 'production',
        token: process.env.MY_SANITY_TOKEN,
        watchMode: true
      },
    },
  ],
}
