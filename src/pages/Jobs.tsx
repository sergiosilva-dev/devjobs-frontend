// Jobs.tsx
// Página de listado: maneja estado local (q, page), llama a la API mock,
// y renderiza tarjetas + paginación. Incluye SEO básico.

import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { listJobs } from '../lib/api';
import type { Job } from '../lib/schema';

export default function Jobs() {
  // Estado de búsqueda y paginación
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // Carga de datos (llama a la API mock)
  async function load() {
    setLoading(true);
    try {
      const res = await listJobs({ q, page, pageSize });
      setItems(res.items);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }

  // Efecto: recargar al cambiar página (y al primer render)
  useEffect(() => {
    load();
  }, [page]);

  return (
    <>
      <Seo title="Empleos" description="Listado de ofertas de trabajo" />

      {/* Encabezado + CTA para crear oferta */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-3xl font-semibold">Empleos</h1>
        <a className="btn" href="/jobs/new">
          Publicar empleo
        </a>
      </div>

      {/* Filtros / Búsqueda */}
      <div className="card p-4 mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          onSubmit={() => {
            setPage(1); // vuelve al inicio de la paginación
            load();
          }}
        />
      </div>

      {/* Estados de carga / vacío / resultados */}
      {loading ? (
        <div className="card p-6">Cargando…</div>
      ) : items.length === 0 ? (
        <div className="card p-6">No se encontraron resultados.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="mt-6">
        <Pagination page={page} pageSize={pageSize} total={total} onChange={setPage} />
      </div>
    </>
  );
}
