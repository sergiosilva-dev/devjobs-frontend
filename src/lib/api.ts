// api.ts
// Capa de acceso a datos (mock). Se puede reemplazar por Axios/fetch a un backend.
// Incluye validación con Zod (defensive programming) antes de retornar datos a la UI.

import type { Job, JobList } from './schema';
import { JobListSchema } from './schema';

// Datos de ejemplo en memoria (simulan la base de datos / API)
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

// Parámetros del listado (q=texto, page y pageSize)
export type ListParams = { q?: string; page?: number; pageSize?: number };

// Listado de empleos con búsqueda simple y paginación
export async function listJobs(params: ListParams = {}): Promise<JobList> {
  const { q = '', page = 1, pageSize = 6 } = params;

  // Filtro por título/empresa/ubicación (case-insensitive)
  const filtered = MOCK.filter((j) =>
    [j.title, j.company, j.location].join(' ').toLowerCase().includes(q.toLowerCase()),
  );

  // Paginación
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  const data: JobList = { total: filtered.length, page, pageSize, items };

  // Validación del contrato antes de devolver a la UI
  return JobListSchema.parse(data);
}

// Obtiene una oferta por id
export async function getJob(id: string): Promise<Job | undefined> {
  return MOCK.find((j) => j.id === id);
}

// Crea o actualiza una oferta (simulado)
export async function createOrUpdateJob(input: Partial<Job>): Promise<Job> {
  // Actualización si existe id
  if (input.id) {
    const idx = MOCK.findIndex((j) => j.id === input.id);
    if (idx >= 0) {
      MOCK[idx] = { ...MOCK[idx], ...input } as Job;
      return MOCK[idx];
    }
  }

  // Creación (id basado en timestamp)
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
