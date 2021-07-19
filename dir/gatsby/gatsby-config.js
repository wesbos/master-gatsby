import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  pathPrefix: '/pizza',
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: '@kentico/gatsby-source-kontent',
      options: {
        projectId: process.env.KONTENT_PROJECT_ID, // Fill in your Project ID
        // if false used authorization key for secured API
        usePreviewUrl:
          process.env.KONTENT_PREVIEW_ENABLED &&
          process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true',
        authorizationKey:
          process.env.KONTENT_PREVIEW_ENABLED &&
          process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true'
            ? process.env.KONTENT_PREVIEW_KEY
            : undefined,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(
          ','
        ).map((lang) => lang.trim()),
      },
    },
  ],
};
