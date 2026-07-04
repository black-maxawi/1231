import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEmployeeById, aantalGekend } from '../data/employees';
import { stations } from '../data/stations';
import { ProgressRing } from '../components/common/ProgressRing';
import { StatusBadge } from '../components/common/StatusBadge';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import type { StationStatus } from '../types';

const STATUS_VOLGORDE: StationStatus[] = ['kent', 'leert', 'wil_leren', 'nog_niet'];

export function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const medewerker = id ? getEmployeeById(id) : undefined;

  if (!medewerker) return <Navigate to="/training" replace />;

  const gekend = aantalGekend(medewerker);
  const percentage = (gekend / stations.length) * 100;
  const perStatus = STATUS_VOLGORDE.map((status) => ({
    status,
    aantal: medewerker.stations.filter((entry) => entry.status === status).length,
  }));

  const inDienstSinds = new Date(medewerker.inDienstSinds).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 animate-in">
      <Link to="/training" className="text-sm font-medium text-mc-gold hover:underline">
        ← Terug naar Training
      </Link>

      <div className="mt-6 flex flex-col items-start gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:p-8">
        <div
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full text-3xl font-bold text-white"
          style={{ backgroundColor: medewerker.avatarKleur }}
        >
          {medewerker.naam
            .split(' ')
            .map((deel) => deel[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{medewerker.naam}</h1>
          <p className="mt-1 text-sm text-mc-gold">{medewerker.rol}</p>
          <p className="mt-1 text-sm opacity-50">In dienst sinds {inDienstSinds}</p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {perStatus.map(({ status, aantal }) => (
              <div key={status} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-center">
                <p className="text-xl font-extrabold tabular-nums">
                  <AnimatedCounter value={aantal} duration={900} />
                </p>
                <p className="text-[11px] opacity-50">
                  {status === 'kent' && 'Gekend'}
                  {status === 'leert' && 'In training'}
                  {status === 'wil_leren' && 'Wil leren'}
                  {status === 'nog_niet' && 'Nog niet gestart'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ProgressRing percentage={percentage} label="Beheerst" sublabel={`${gekend} / ${stations.length} stations`} />
      </div>

      <h2 className="mb-4 mt-12 text-lg font-semibold opacity-90">Stations</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {stations.map((station, i) => {
          const entry = medewerker.stations.find((e) => e.stationId === station.id);
          return (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{station.icoon}</span>
                <div>
                  <p className="font-medium">{station.naam}</p>
                  <p className="text-xs opacity-50">{station.omschrijving}</p>
                </div>
              </div>
              {entry && <StatusBadge status={entry.status} />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
