import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ children, location, description, title }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s — ${site.siteMetadata.title}`}>
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {children}

      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata.twitter}
        key="twhandle"
      />
    </Helmet>
  );
}
