// JobCard.tsx
// Tarjeta visual para una oferta puntual (resumen).
// Muestra título, empresa, ubicación, fecha y, si aplica, rango salarial.

import type { Job } from '../lib/schema';

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="card p-4 flex flex-col gap-2">
      {/* Enlace al detalle de la oferta (accesible) */}
      <a className="text-xl font-semibold hover:underline" href={`/jobs/${job.id}`}>
        {job.title}
      </a>

      {/* Empresa y ubicación (usa guion si no hay ubicación) */}
      <p className="opacity-80">
        {job.company} • {job.location ?? '—'}
      </p>

      {/* Metadatos de publicación y salario */}
      <div className="flex items-center gap-3 text-sm opacity-75">
        <span>{new Date(job.publishedAt).toLocaleDateString()}</span>
        {(job.salaryMin || job.salaryMax) && (
          <span>
            {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} {job.currency}
          </span>
        )}
      </div>
    </article>
  );
}
