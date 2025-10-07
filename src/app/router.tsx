// router.tsx
// Definición de rutas de la SPA con React Router.

import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import JobDetail from '../pages/JobDetail';
import JobForm from '../pages/JobForm';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  // Página de inicio → información y CTA hacia empleos
  { path: '/', element: <Home /> },
  // Listado de empleos con filtros y paginación
  { path: '/jobs', element: <Jobs /> },
  // Detalle de una oferta (incluye JSON-LD para SEO)
  { path: '/jobs/:id', element: <JobDetail /> },
  // Crear una oferta
  { path: '/jobs/new', element: <JobForm /> },
  // Editar una oferta (mismo formulario, precarga luego)
  { path: '/jobs/:id/edit', element: <JobForm /> },
  // 404
  { path: '*', element: <NotFound /> },
]);
