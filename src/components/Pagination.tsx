type Props = { page: number; pageSize: number; total: number; onChange: (page: number) => void };

export default function Pagination({ page, pageSize, total, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  return (
    <nav className="flex gap-2 items-center" aria-label="Paginación">
      <button className="btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Anterior
      </button>
      <span className="opacity-75 text-sm">
        Página {page} de {pages}
      </span>
      <button className="btn" disabled={page === pages} onClick={() => onChange(page + 1)}>
        Siguiente
      </button>
    </nav>
  );
}
