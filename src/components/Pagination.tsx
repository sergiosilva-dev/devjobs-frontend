// Pagination.tsx
// Controles de paginación básicos (Anterior/Siguiente). Oculta si solo hay 1 página.

type Props = { page: number; pageSize: number; total: number; onChange: (page: number) => void };

export default function Pagination({ page, pageSize, total, onChange }: Props) {
  // Cálculo de páginas totales (al menos 1)
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  return (
    <nav className="flex gap-2 items-center" aria-label="Paginación">
      {/* Botón anterior (deshabilitado en primera página) */}
      <button className="btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Anterior
      </button>

      {/* Estado actual */}
      <span className="opacity-75 text-sm">
        Página {page} de {pages}
      </span>

      {/* Botón siguiente (deshabilitado en última página) */}
      <button className="btn" disabled={page === pages} onClick={() => onChange(page + 1)}>
        Siguiente
      </button>
    </nav>
  );
}
