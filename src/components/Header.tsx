export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/60 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <a href="/" className="text-2xl font-bold">
          DevJobs
        </a>
        <nav className="flex gap-4">
          <a href="/jobs" className="btn">
            Empleos
          </a>
          <a href="/jobs/new" className="btn">
            Publicar
          </a>
        </nav>
      </div>
    </header>
  );
}
