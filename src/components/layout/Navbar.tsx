import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/voorraadbeheer', label: 'Voorraadbeheer' },
  { to: '/personeel', label: 'Personeel' },
  { to: '/training', label: 'Training' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mc-ink/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-2xl">🍔</span>
          <span className="font-extrabold tracking-tight text-mc-paper">
            McDonald&apos;s <span className="text-mc-gold">Lange Vie</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-mc-gold text-mc-ink' : 'text-mc-paper/80 hover:bg-white/10 hover:text-mc-paper'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/15 sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="text-lg">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 sm:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-mc-gold text-mc-ink' : 'text-mc-paper/80'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
