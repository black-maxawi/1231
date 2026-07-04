// Imports the real "Allround Overzicht" workbook (public/data/training/allround-overzicht-utrecht.xlsx)
// and (re)generates src/data/stations.ts and src/data/employees.ts from it.
//
// Re-run this whenever the master spreadsheet is updated (new hires, new scores):
//   npm run import:training-data
//
// Expected sheet "📋 Overzicht" layout: row 0 = title, row 1 = summary counts,
// row 2 = header ("Naam", "Allround", "# Stations", "Gem. Score", <station names...>),
// row 3+ = one row per employee. A station cell is a number (0–1 proficiency) when
// trained, or a placeholder ("—" / "❌" / empty) when not yet trained.
import { readFileSync, writeFileSync } from 'node:fs';
import * as XLSX from 'xlsx';

const BRON = 'public/data/training/allround-overzicht-utrecht.xlsx';
const SHEET_NAAM = '📋 Overzicht';
const STATION_KOLOM_START = 4;
const ALLROUND_DREMPEL = 10;

const ICOONS = {
  Assembler: '🥪',
  'Batch Cooker Friteuse': '🔥',
  'Batch Cooker Grill': '🍔',
  'Dranken Tapper': '🥤',
  Expeditor: '📦',
  Friet: '🍟',
  Initiator: '🚦',
  Lobby: '🧽',
  'McCafé': '☕',
  McDelivery: '🛵',
  'Order Taker Counter': '🧾',
  'Runner-Presenter': '🏃',
};

const OMSCHRIJVINGEN = {
  Assembler: 'Broodjes samenstellen en verpakken.',
  'Batch Cooker Friteuse': 'Grote batches friet en snacks frituren.',
  'Batch Cooker Grill': 'Vlees en kip in batches bereiden op de grill.',
  'Dranken Tapper': 'Frisdrank en andere dranken tappen en klaarzetten.',
  Expeditor: 'Bestellingen controleren en samenvoegen voor uitgifte.',
  Friet: 'Friet bereiden en op temperatuur houden.',
  Initiator: 'Het bestelproces starten en gasten verwelkomen.',
  Lobby: 'Het restaurant schoonhouden en gasten helpen.',
  'McCafé': 'Koffie en dranken bereiden aan de McCafé.',
  McDelivery: 'Bezorgbestellingen verwerken en klaarzetten.',
  'Order Taker Counter': 'Bestellingen opnemen en afrekenen aan de kassa.',
  'Runner-Presenter': 'Bestellingen naar gasten brengen en presenteren.',
};

const AVATAR_KLEUREN = ['#DA291C', '#FFC72C', '#2E7D32', '#1565C0', '#6A1B9A', '#EF6C00', '#00838F', '#AD1457'];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function kleurVoorNaam(naam) {
  const hash = [...naam].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_KLEUREN[hash % AVATAR_KLEUREN.length];
}

const wb = XLSX.read(readFileSync(BRON), { type: 'buffer' });
const sheet = wb.Sheets[SHEET_NAAM];
if (!sheet) throw new Error(`Sheet "${SHEET_NAAM}" niet gevonden in ${BRON}`);

const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: '' });
const headerRow = rows[2];
const stationNamen = headerRow.slice(STATION_KOLOM_START).filter((naam) => naam !== '');

const stations = stationNamen.map((naam) => ({
  id: slugify(naam),
  naam,
  omschrijving: OMSCHRIJVINGEN[naam] ?? '',
  icoon: ICOONS[naam] ?? '⭐',
}));

const employeeRows = rows.slice(3).filter((row) => typeof row[0] === 'string' && row[0].trim() !== '');

const gebruikteIds = new Set();
const employees = employeeRows.map((row) => {
  const naam = String(row[0]).trim();
  let id = slugify(naam);
  let suffix = 2;
  while (gebruikteIds.has(id)) {
    id = `${slugify(naam)}-${suffix}`;
    suffix += 1;
  }
  gebruikteIds.add(id);

  const stationEntries = stations.map((station, i) => {
    const cel = row[STATION_KOLOM_START + i];
    const score = typeof cel === 'number' ? Math.round(cel * 1000) / 1000 : null;
    return { stationId: station.id, score };
  });

  return { id, naam, avatarKleur: kleurVoorNaam(naam), stations: stationEntries };
});

const stationsTs = `// Gegenereerd door scripts/import-training-data.mjs uit
// public/data/training/allround-overzicht-utrecht.xlsx — draai het script opnieuw
// na een update van dat werkblad. Handmatige aanpassingen hier gaan dan verloren.
import type { Station } from '../types';

export const ALLROUND_DREMPEL = ${ALLROUND_DREMPEL};

export const stations: Station[] = ${JSON.stringify(stations, null, 2)};
`;

const employeesTs = `// Gegenereerd door scripts/import-training-data.mjs uit
// public/data/training/allround-overzicht-utrecht.xlsx — draai het script opnieuw
// na een update van dat werkblad. Handmatige aanpassingen hier gaan dan verloren.
import type { Employee } from '../types';
import { ALLROUND_DREMPEL } from './stations';

export const employees: Employee[] = ${JSON.stringify(employees, null, 2)};

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((employee) => employee.id === id);
}

export function aantalGekend(employee: Employee): number {
  return employee.stations.filter((entry) => entry.score !== null).length;
}

export function gemiddeldeScore(employee: Employee): number {
  const scores = employee.stations
    .map((entry) => entry.score)
    .filter((score): score is number => score !== null);
  return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
}

export function isAllround(employee: Employee): boolean {
  return aantalGekend(employee) >= ALLROUND_DREMPEL;
}
`;

writeFileSync('src/data/stations.ts', stationsTs);
writeFileSync('src/data/employees.ts', employeesTs);

console.log(`Geïmporteerd: ${employees.length} medewerkers, ${stations.length} stations.`);
console.log(`Allround (>= ${ALLROUND_DREMPEL}/${stations.length}): ${employees.filter((e) => e.stations.filter((s) => s.score !== null).length >= ALLROUND_DREMPEL).length}`);
