// Esquemas y tipos para ofertas (valida datos entrantes/salientes)
import { z } from 'zod';

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

export const JobListSchema = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  items: z.array(JobSchema),
});

export type Job = z.infer<typeof JobSchema>;
export type JobList = z.infer<typeof JobListSchema>;
