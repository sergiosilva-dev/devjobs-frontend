// seo.ts
// Helper para generar JSON-LD de JobPosting (mejora el SEO de los detalles de oferta).

export const jobPostingLd = (job: {
  title: string;
  description: string;
  datePosted: string;
  hiringOrganization: { name: string };
  employmentType?: string;
  jobLocation?: { addressLocality?: string; addressRegion?: string; addressCountry?: string };
  baseSalary?: {
    value: { currency: string; minValue?: number; maxValue?: number; unitText: string };
  };
  validThrough?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  employmentType: job.employmentType,
  hiringOrganization: { '@type': 'Organization', name: job.hiringOrganization.name },
  jobLocation: job.jobLocation && {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: job.jobLocation.addressLocality,
      addressRegion: job.jobLocation.addressRegion,
      addressCountry: job.jobLocation.addressCountry,
    },
  },
  baseSalary: job.baseSalary && {
    '@type': 'MonetaryAmount',
    currency: job.baseSalary.value.currency,
    value: {
      '@type': 'QuantitativeValue',
      minValue: job.baseSalary.value.minValue,
      maxValue: job.baseSalary.value.maxValue,
      unitText: job.baseSalary.value.unitText,
    },
  },
  validThrough: job.validThrough,
});
