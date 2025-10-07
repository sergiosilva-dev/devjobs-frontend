// Tarjeta de empleo (presentación)
import type { Job } from '../lib/schema';

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="card p-4 flex flex-col gap-2">
      <a className="text-xl font-semibold hover:underline" href={`/jobs/${job.id}`}>
        {job.title}
      </a>
      <p className="opacity-80">
        {job.company} • {job.location ?? '—'}
      </p>
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
