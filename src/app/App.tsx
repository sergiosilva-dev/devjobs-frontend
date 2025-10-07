// App.tsx
// Contenedor raíz de la aplicación: provee Helmet (SEO) y estructura base
// con Header, Footer y el área central donde se renderizan las rutas.

import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Analytics from '../components/Analytics';

export default function App() {
  return (
    // HelmetProvider permite inyectar <title>, <meta> y JSON-LD desde cualquier página
    <HelmetProvider>
      <Analytics />
      {/* Layout de 3 filas: header / contenido / footer */}
      <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
        <Header />
        {/* Contenedor central con padding vertical */}
        <main className="container py-6">
          {/* RouterProvider dibuja el componente asociado a la ruta actual */}
          <RouterProvider router={router} />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
