import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { employees, aantalGekend } from '../data/employees';
import { stations } from '../data/stations';
import { StatCard } from '../components/common/StatCard';

const SECTIES = [
  {
    to: '/voorraadbeheer',
    icoon: '📦',
    titel: 'Voorraadbeheer',
    omschrijving: "Foto's van magazijn en koelcellen, plus het actuele voorraadoverzicht — direct inzichtelijk.",
    kleur: 'from-mc-red/25 via-mc-red/5 to-transparent',
  },
  {
    to: '/personeel',
    icoon: '🧑‍🤝‍🧑',
    titel: 'Personeel',
    omschrijving: "Teamfoto's en het personeelsrooster, overzichtelijk in de browser te bekijken.",
    kleur: 'from-sky-500/25 via-sky-500/5 to-transparent',
  },
  {
    to: '/training',
    icoon: '🎓',
    titel: 'Training',
    omschrijving: '70 medewerkers, elk met een eigen pagina: welke stations kennen ze, en welke willen ze nog leren?',
    kleur: 'from-mc-gold/25 via-mc-gold/5 to-transparent',
  },
];

export function Home() {
  const totaalGekend = employees.reduce((som, medewerker) => som + aantalGekend(medewerker), 0);
  const gemiddeld = totaalGekend / employees.length;

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 animate-float rounded-full bg-mc-red/25 blur-[120px]" />
          <div className="absolute right-[8%] top-[20%] h-[300px] w-[300px] animate-float rounded-full bg-mc-gold/20 blur-[110px] [animation-delay:1.5s]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-mc-gold"
          >
            Personeelsportaal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl"
          >
            McDonald&apos;s <span className="text-mc-gold">Lange Vie</span> Utrecht
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-lg opacity-70"
          >
            Eén overzichtelijke plek voor voorraad, personeel en training. Beweeg je muis
            over de pagina en breng het restaurant tot leven.
          </motion.p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
          {SECTIES.map((sectie, i) => (
            <motion.div
              key={sectie.to}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
            >
              <Link
                to={sectie.to}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${sectie.kleur} p-6 transition-transform duration-300 hover:-translate-y-1.5`}
              >
                <span className="text-4xl">{sectie.icoon}</span>
                <h2 className="mt-4 text-xl font-bold">{sectie.titel}</h2>
                <p className="mt-2 flex-1 text-sm opacity-70">{sectie.omschrijving}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-mc-gold">
                  Bekijk sectie
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard icoon="🧑‍🍳" waarde={employees.length} label="Medewerkers" />
          <StatCard icoon="🗺️" waarde={stations.length} label="Stations in het restaurant" />
          <StatCard icoon="✅" waarde={totaalGekend} label="Beheerste stations, teambreed" />
          <StatCard icoon="📈" waarde={gemiddeld} decimals={1} label="Gemiddeld per medewerker" />
        </div>
      </section>
    </div>
  );
}
