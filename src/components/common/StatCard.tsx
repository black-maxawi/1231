import type { ReactNode } from 'react';
import { AnimatedCounter } from './AnimatedCounter';

interface StatCardProps {
  icoon: ReactNode;
  waarde: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export function StatCard({ icoon, waarde, suffix, decimals, label }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-mc-gold/40">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-mc-gold/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
      <div className="text-3xl">{icoon}</div>
      <div className="mt-3 text-4xl font-extrabold tabular-nums text-mc-paper">
        <AnimatedCounter value={waarde} suffix={suffix} decimals={decimals} />
      </div>
      <div className="mt-1 text-sm opacity-70">{label}</div>
    </div>
  );
}
