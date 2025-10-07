// schema.ts
// Contratos de datos con Zod (validación en runtime) + tipos TS (compile-time).

import { z } from 'zod';

// Estructura de una oferta de empleo
export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  currency: z.string().default('USD'),
  publishedAt: z.string(), // ISO date
  description: z.string(),
  employmentType: z.string().optional(),
});

// Respuesta paginada
export const JobListSchema = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  items: z.array(JobSchema),
});

// Tipos TS derivados de los esquemas (ayudan al IDE y al compilador)
export type Job = z.infer<typeof JobSchema>;
export type JobList = z.infer<typeof JobListSchema>;
