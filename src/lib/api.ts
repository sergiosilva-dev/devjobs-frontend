// api.ts — Cliente Axios hacia JSON Server (prefijo /api) con fallback a MOCK
import axios from 'axios';
import type { Job, JobList } from './schema';
import { JobListSchema, JobSchema } from './schema';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ej: http://localhost:5174/api
  timeout: 8000
});

// --- MOCK local de respaldo (si no hay servidor) ---
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
    description: 'Construcción de interfaces en React + TS. Hooks, routing y pruebas.',
    employmentType: 'FULL_TIME'
  },
  {
    id: '2',
    title: 'Backend Java (Spring)',
    company: 'Tech Labs',
    location: 'Remoto',
    currency: 'COP',
    publishedAt: new Date().toISOString(),
    description: 'APIs REST con Spring Boot. JPA, seguridad y pruebas.',
    employmentType: 'FULL_TIME'
  }
];

export type ListParams = { q?: string; page?: number; pageSize?: number };

export async function listJobs(params: ListParams = {}): Promise<JobList> {
  const { q = '', page = 1, pageSize = 6 } = params;

  try {
    // JSON Server soporta _page y _limit; para búsqueda simple usamos q
    const { data, headers } = await api.get<Job[]>('/jobs', {
      params: { q, _page: page, _limit: pageSize }
    });

    const total = Number(headers['x-total-count'] ?? data.length);
    const parsedItems = data.map((j) => JobSchema.parse(j));
    const result: JobList = { total, page, pageSize, items: parsedItems };
    return JobListSchema.parse(result);
  } catch {
    // Fallback a MOCK si el server no responde
    const filtered = MOCK.filter((j) =>
      [j.title, j.company, j.location].join(' ').toLowerCase().includes(q.toLowerCase())
    );
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return JobListSchema.parse({ total: filtered.length, page, pageSize, items });
  }
}

export async function getJob(id: string): Promise<Job | undefined> {
  try {
    const { data } = await api.get<Job>(`/jobs/${id}`);
    return JobSchema.parse(data);
  } catch {
    return MOCK.find((j) => j.id === id);
  }
}

export async function createOrUpdateJob(input: Partial<Job>): Promise<Job> {
  try {
    if (input.id) {
      const { data } = await api.put<Job>(`/jobs/${input.id}`, input);
      return JobSchema.parse(data);
    }
    const { data } = await api.post<Job>('/jobs', { ...input, publishedAt: new Date().toISOString() });
    return JobSchema.parse(data);
  } catch {
    // Fallback: modifica MOCK en memoria
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
      employmentType: input.employmentType
    };
    MOCK.unshift(job);
    return job;
  }
}