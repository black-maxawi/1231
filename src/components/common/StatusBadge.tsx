function tierClasses(score: number): string {
  if (score >= 0.95) return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  if (score >= 0.85) return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
}

function tierDot(score: number): string {
  if (score >= 0.95) return 'bg-emerald-400';
  if (score >= 0.85) return 'bg-amber-400';
  return 'bg-sky-400';
}

export function StatusBadge({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        Nog te leren
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tierClasses(score)}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tierDot(score)}`} />
      {Math.round(score * 100)}% getraind
    </span>
  );
}
