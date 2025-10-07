import { useState } from 'react';
import Seo from '../components/Seo';
import type { FormEvent } from 'react';
import { createOrUpdateJob } from '../lib/api';

export default function JobForm() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !company) {
      alert('Título y empresa son obligatorios');
      return;
    }
    await createOrUpdateJob({ title, company, location, description: 'Descripción pendiente' });
    window.location.href = '/jobs';
  }

  return (
    <>
      <Seo title="Publicar empleo" />
      <form className="card p-6 space-y-4" onSubmit={handleSubmit} aria-label="Publicar empleo">
        <div>
          <label className="block mb-1">Título*</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Empresa*</label>
          <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Ubicación</label>
          <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <button className="btn" type="submit">
          Guardar
        </button>
      </form>
    </>
  );
}
