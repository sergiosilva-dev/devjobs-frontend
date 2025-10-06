import Seo from '../components/Seo';

export default function Home() {
  return (
    <>
      <Seo title="Inicio" description="Encuentra ofertas de empleo en tecnología" />
      <section className="card p-8">
        <h1 className="text-3xl font-semibold">Bienvenido a DevJobs</h1>
        <p className="mt-2 opacity-80">Explora cientos de vacantes actualizadas.</p>
      </section>
    </>
  );
}
