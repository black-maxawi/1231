import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Voorraadbeheer = lazy(() => import('./pages/Voorraadbeheer').then((m) => ({ default: m.Voorraadbeheer })));
const Personeel = lazy(() => import('./pages/Personeel').then((m) => ({ default: m.Personeel })));
const Training = lazy(() => import('./pages/Training').then((m) => ({ default: m.Training })));
const EmployeeDetail = lazy(() => import('./pages/EmployeeDetail').then((m) => ({ default: m.EmployeeDetail })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-mc-gold border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="voorraadbeheer" element={<Voorraadbeheer />} />
          <Route path="personeel" element={<Personeel />} />
          <Route path="training" element={<Training />} />
          <Route path="training/:id" element={<EmployeeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
