import type { ReactNode } from 'react';

interface SectionHeaderProps {
  kicker: string;
  titel: string;
  omschrijving?: string;
  actie?: ReactNode;
}

export function SectionHeader({ kicker, titel, omschrijving, actie }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mc-gold">{kicker}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-mc-paper sm:text-4xl">{titel}</h1>
        {omschrijving && <p className="mt-2 max-w-2xl text-base opacity-70">{omschrijving}</p>}
      </div>
      {actie && <div className="shrink-0">{actie}</div>}
    </div>
  );
}
