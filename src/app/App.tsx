import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
        <Header />
        <main className="container py-6">
          <RouterProvider router={router} />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
