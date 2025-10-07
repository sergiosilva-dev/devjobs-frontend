// Seo.tsx
// Componente reutilizable para SEO on-page:
// - <title> y <meta name="description">
// - Etiquetas Open Graph (Facebook/LinkedIn) y Twitter
// - Soporte para JSON-LD (Structured Data) cuando se requiera.

import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_URL, DEFAULT_TITLE, DEFAULT_DESC, DEFAULT_IMAGE } from '../lib/site';

type Props = {
  title?: string;
  description?: string;
  path?: string; // '/jobs/123' → canónica absoluta
  image?: string; // override og image
  jsonLd?: object; // JSON-LD específico de la página
  index?: boolean; // por defecto true, false = noindex
};

export default function Seo({ title, description, path, image, jsonLd, index = true }: Props) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESC;
  const canonical = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />

        {/* Indexación */}
        <meta name="robots" content={index ? 'index,follow' : 'noindex,nofollow'} />

        {/* Open Graph */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
