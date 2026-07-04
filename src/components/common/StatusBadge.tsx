import type { StationStatus } from '../../types';
import { statusLabels } from '../../data/stations';

const STYLES: Record<StationStatus, string> = {
  kent: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  leert: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  wil_leren: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  nog_niet: 'bg-white/5 text-white/50 border-white/10',
};

const DOTS: Record<StationStatus, string> = {
  kent: 'bg-emerald-400',
  leert: 'bg-amber-400',
  wil_leren: 'bg-sky-400',
  nog_niet: 'bg-white/30',
};

export function StatusBadge({ status }: { status: StationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOTS[status]}`} />
      {statusLabels[status]}
    </span>
  );
}
