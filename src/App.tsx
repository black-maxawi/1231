import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

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

// Voorraadbeheer en Personeel zijn tijdelijk verborgen — alleen Training is
// actief. De pagina's en routes blijven in de code; alleen de navigatie en
// deze redirects zijn aangepast, dus ze zijn zo weer terug te zetten.
function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/training" replace />} />
          <Route path="voorraadbeheer" element={<Navigate to="/training" replace />} />
          <Route path="personeel" element={<Navigate to="/training" replace />} />
          <Route path="training" element={<Training />} />
          <Route path="training/:id" element={<EmployeeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
