// Seo.tsx
// Componente reutilizable para SEO on-page:
// - <title> y <meta name="description">
// - Etiquetas Open Graph (Facebook/LinkedIn) y Twitter
// - Soporte para JSON-LD (Structured Data) cuando se requiera.

import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string; // Título específico de la vista
  description?: string; // Descripción corta (<= 160 chars idealmente)
  url?: string; // Canonical URL
  image?: string; // Imagen para OG/Twitter
  jsonLd?: object; // Objeto JSON-LD para inyectar en <script type="application/ld+json">
};

export default function Seo({ title, description, url, image, jsonLd }: Props) {
  // Construye el título completo (marca + página)
  const full = title ? `${title} | DevJobs` : 'DevJobs';

  return (
    <>
      <Helmet>
        {/* Title / Description */}
        <title>{full}</title>
        {description && <meta name="description" content={description} />}
        {url && <link rel="canonical" href={url} />}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        {url && <meta property="og:url" content={url} />}
        {title && <meta property="og:title" content={full} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        {title && <meta name="twitter:title" content={full} />}
        {description && <meta name="twitter:description" content={description} />}
        {image && <meta name="twitter:image" content={image} />}
      </Helmet>

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          // Nota: dangerouslySetInnerHTML es el método recomendado para inyectar JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
