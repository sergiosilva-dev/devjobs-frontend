// JobDetail.tsx
// Muestra el detalle de una oferta e inyecta JSON-LD (JobPosting) para SEO.

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getJob } from '../lib/api';
import type { Job } from '../lib/schema';
import { jobPostingLd } from '../lib/seo';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  // Carga la oferta por id cuando cambia la ruta
  useEffect(() => {
    (async () => {
      const data = id ? await getJob(id) : undefined;
      setJob(data ?? null);
    })();
  }, [id]);

  if (!job) return <div className="card p-6">Cargando…</div>;

  // JSON-LD para buscadores (JobPosting)
  const ld = jobPostingLd({
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt,
    hiringOrganization: { name: job.company },
    employmentType: job.employmentType,
    jobLocation: { addressLocality: job.location },
    baseSalary:
      job.salaryMin || job.salaryMax
        ? {
            value: {
              currency: job.currency,
              minValue: job.salaryMin,
              maxValue: job.salaryMax,
              unitText: 'MONTH',
            },
          }
        : undefined,
  });

  return (
    <>
      <Seo
        path={`/jobs/${id}`}
        title={job.title}
        description={job.description.slice(0, 150)}
        jsonLd={ld}
      />
      <article className="card p-6 prose prose-invert max-w-none">
        <h1 className="mb-2">{job.title}</h1>
        <p className="opacity-80">
          {job.company} • {job.location ?? '—'}
        </p>
        <hr />
        <p>{job.description}</p>
      </article>
    </>
  );
}
