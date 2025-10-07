// Footer.tsx
// Pie de página simple con derechos/nota técnica.

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="container py-6 text-sm opacity-75">
        © {new Date().getFullYear()} DevJobs — React + Vite · UI 2025
      </div>
    </footer>
  );
}
