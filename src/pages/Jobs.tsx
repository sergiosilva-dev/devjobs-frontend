import { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { listJobs } from '../lib/api';
import { Job } from '../lib/schema';

export default function Jobs() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    load();
  }, [page]);
  return (
    <>
      <Seo title="Empleos" description="Listado de ofertas de trabajo" />
      <div className="flex items-center justify-between mb-4 gap-3">
        <h1 className="text-3xl font-semibold">Empleos</h1>
        <a className="btn" href="/jobs/new">
          Publicar empleo
        </a>
      </div>

      <div className="card p-4 mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          onSubmit={() => {
            setPage(1);
            load();
          }}
        />
      </div>

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

      <div className="mt-6">
        <Pagination page={page} pageSize={pageSize} total={total} onChange={setPage} />
      </div>
    </>
  );
}
