// API mockeada con datos locales. Cambia BASE_URL cuando conectes backend real.
import type { Job, JobList } from './schema';
import { JobListSchema } from './schema';

const MOCK: Job[] = [
  {
    id: '1',
    title: 'Frontend React Developer',
    company: 'Up Develop',
    location: 'Bogotá, CO',
    salaryMin: 5000000,
    salaryMax: 8000000,
    currency: 'COP',
    publishedAt: new Date().toISOString(),
    description:
      'Construcción de interfaces en React + TypeScript. Experiencia con hooks, routing y pruebas.',
    employmentType: 'FULL_TIME',
  },
  {
    id: '2',
    title: 'Backend Java (Spring)',
    company: 'Tech Labs',
    location: 'Remoto',
    currency: 'COP',
    publishedAt: new Date().toISOString(),
    description: 'APIs REST con Spring Boot. JPA, seguridad y pruebas.',
    employmentType: 'FULL_TIME',
  },
];

export type ListParams = { q?: string; page?: number; pageSize?: number };

export async function listJobs(params: ListParams = {}): Promise<JobList> {
  const { q = '', page = 1, pageSize = 6 } = params;

  const filtered = MOCK.filter((j) =>
    [j.title, j.company, j.location].join(' ').toLowerCase().includes(q.toLowerCase()),
  );

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  const data: JobList = { total: filtered.length, page, pageSize, items };

  // Validación de contrato de datos (defensa)
  return JobListSchema.parse(data);
}

export async function getJob(id: string): Promise<Job | undefined> {
  return MOCK.find((j) => j.id === id);
}

export async function createOrUpdateJob(input: Partial<Job>): Promise<Job> {
  if (input.id) {
    const idx = MOCK.findIndex((j) => j.id === input.id);
    if (idx >= 0) {
      MOCK[idx] = { ...MOCK[idx], ...input } as Job;
      return MOCK[idx];
    }
  }
  const job: Job = {
    id: String(Date.now()),
    title: input.title || 'Untitled',
    company: input.company || 'N/A',
    location: input.location,
    salaryMin: input.salaryMin,
    salaryMax: input.salaryMax,
    currency: input.currency || 'COP',
    publishedAt: new Date().toISOString(),
    description: input.description || '',
    employmentType: input.employmentType,
  };
  MOCK.unshift(job);
  return job;
}
