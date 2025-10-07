// src/lib/site.ts
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || 'http://localhost:5173';
export const SITE_NAME = 'DevJobs';
export const DEFAULT_TITLE = 'DevJobs — Encuentra y publica ofertas tech';
export const DEFAULT_DESC =
    'DevJobs es una plataforma moderna para descubrir y publicar ofertas de empleo en tecnología.';
export const DEFAULT_IMAGE = '/og-image.png'; // en /public