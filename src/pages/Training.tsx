import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { employees, aantalGekend, isAllround } from '../data/employees';
import { stations } from '../data/stations';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';

export function Training() {
  const [zoekterm, setZoekterm] = useState('');

  const { totaalGekend, gemiddeld, besteStation, aantalAllround } = useMemo(() => {
    const totaal = employees.reduce((som, medewerker) => som + aantalGekend(medewerker), 0);
    const perStation = stations.map((station) => ({
      station,
      aantal: employees.filter((medewerker) =>
        medewerker.stations.some((entry) => entry.stationId === station.id && entry.score !== null),
      ).length,
    }));
    const beste = perStation.reduce((a, b) => (b.aantal > a.aantal ? b : a));
    return {
      totaalGekend: totaal,
      gemiddeld: totaal / employees.length,
      besteStation: beste,
      aantalAllround: employees.filter(isAllround).length,
    };
  }, []);

  const gefilterd = useMemo(() => {
    const term = zoekterm.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((medewerker) => medewerker.naam.toLowerCase().includes(term));
  }, [zoekterm]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 animate-in">
      <SectionHeader
        kicker="Personeelsportaal"
        titel="Training"
        omschrijving={`${employees.length} medewerkers, elk met een eigen pagina. Bekijk per medewerker welke stations al beheerst worden en welke nog geleerd moeten worden.`}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <StatCard icoon="🧑‍🍳" waarde={employees.length} label="Medewerkers in training" />
        <StatCard icoon="⭐" waarde={aantalAllround} label="Allround medewerkers" />
        <StatCard icoon="🗺️" waarde={stations.length} label="Stations totaal" />
        <StatCard icoon="📈" waarde={gemiddeld} decimals={1} label="Gemiddeld gekende stations" />
      </div>

      <p className="mt-3 text-sm opacity-50">
        Sterkste station: <span className="text-mc-gold">{besteStation.station.naam}</span> ({besteStation.aantal} van{' '}
        {employees.length} medewerkers) · {totaalGekend} beheerste stations teambreed
      </p>

      <div className="mt-10">
        <input
          value={zoekterm}
          onChange={(event) => setZoekterm(event.target.value)}
          placeholder="Zoek een medewerker op naam…"
          className="w-full max-w-sm rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:opacity-50 focus:border-mc-gold/60"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gefilterd.map((medewerker, i) => {
          const gekend = aantalGekend(medewerker);
          const percentage = Math.round((gekend / stations.length) * 100);
          const allround = isAllround(medewerker);
          return (
            <motion.div
              key={medewerker.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (i % 9) * 0.03 }}
            >
              <Link
                to={`/training/${medewerker.id}`}
                className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-mc-gold/40"
              >
                <div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-bold text-white"
                  style={{ backgroundColor: medewerker.avatarKleur }}
                >
                  {medewerker.naam
                    .split(' ')
                    .map((deel) => deel[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{medewerker.naam}</p>
                  <p className="text-xs opacity-50">{allround ? '⭐ Allround' : '🎯 Nog in training'}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-mc-gold to-mc-red transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs opacity-60">
                    {gekend} / {stations.length} stations gekend
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
        {gefilterd.length === 0 && (
          <p className="col-span-full py-12 text-center opacity-50">Geen medewerker gevonden voor &quot;{zoekterm}&quot;.</p>
        )}
      </div>
    </div>
  );
}
