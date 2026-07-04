import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <span className="text-5xl">🍟</span>
      <h1 className="mt-4 text-2xl font-bold">Pagina niet gevonden</h1>
      <p className="mt-2 opacity-60">Deze pagina bestaat niet (meer).</p>
      <Link to="/" className="mt-6 rounded-full bg-mc-gold px-5 py-2 font-semibold text-mc-ink">
        Terug naar home
      </Link>
    </div>
  );
}
