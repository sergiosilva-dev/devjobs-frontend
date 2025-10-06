import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import JobDetail from '../pages/JobDetail';
import JobForm from '../pages/JobForm';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/jobs/:id', element: <JobDetail /> },
  { path: '/jobs/new', element: <JobForm /> },
  { path: '/jobs/:id/edit', element: <JobForm /> },
  { path: '*', element: <NotFound /> },
]);
