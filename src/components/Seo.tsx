import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  jsonLd?: object;
};

export default function Seo({ title, description, url, image, jsonLd }: Props) {
  const full = title ? `${title} | DevJobs` : 'DevJobs';
  return (
    <>
      <Helmet>
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

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
