import { Link } from 'react-router-dom';

// Voorraadbeheer en Personeel zijn tijdelijk verborgen — alleen Training is
// actief, dus de nav is vereenvoudigd tot alleen het merk + één bestemming.
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mc-ink/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/training" className="flex items-center gap-2">
          <span className="text-2xl">🍔</span>
          <span className="font-extrabold tracking-tight text-mc-paper">
            McDonald&apos;s <span className="text-mc-gold">Lange Vie</span>
          </span>
        </Link>

        <Link
          to="/training"
          className="rounded-full bg-mc-gold px-4 py-2 text-sm font-medium text-mc-ink transition-transform hover:scale-105"
        >
          Training
        </Link>
      </nav>
    </header>
  );
}
