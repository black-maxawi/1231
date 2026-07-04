import type { Employee, EmployeeRol, StationStatus } from '../types';
import { stations } from './stations';
import { mulberry32, pick, randInt, shuffle } from '../lib/prng';
import { slugify } from '../lib/slug';

const VOORNAMEN = [
  'Lars', 'Sanne', 'Daan', 'Emma', 'Sem', 'Julia', 'Milan', 'Sophie', 'Bram', 'Tess',
  'Noah', 'Nina', 'Finn', 'Lotte', 'Levi', 'Fenna', 'Liam', 'Anna', 'Thijs', 'Roos',
  'Jesse', 'Fleur', 'Luuk', 'Sara', 'Tim', 'Eva', 'Ruben', 'Maud', 'Stijn', 'Iris',
  'Jayden', 'Vera', 'Mees', 'Lieke', 'Cas', 'Isa', 'Owen', 'Merel', 'Teun', 'Yara',
  'Daniël', 'Amber', 'Hidde', 'Fenne', 'Jack', 'Zoë', 'Boaz', 'Noor', 'Max', 'Femke',
  'Ayoub', 'Amina', 'Yusuf', 'Sara', 'Ilyas', 'Yasmine', 'Rayan', 'Nour', 'Adam', 'Lina',
  'Kevin', 'Demi', 'Robin', 'Esmee', 'Twan', 'Naomi', 'Bart', 'Marit', 'Joris', 'Britt',
] as const;

const ACHTERNAMEN = [
  'de Vries', 'Jansen', 'Bakker', 'Visser', 'Smit', 'Meijer', 'de Boer', 'Mulder',
  'de Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'van Leeuwen', 'Dijkstra', 'Smits',
  'de Wit', 'van Dijk', 'Kok', 'van den Berg', 'Willems', 'Jacobs', 'Brouwer', 'de Jong',
  'van der Meer', 'van der Linden', 'Kuipers', 'Prins', 'Schouten', 'Postma', 'Huisman',
  'Molenaar', 'Verhoeven', 'Koster', 'van Vliet', 'Timmermans', 'Groen', 'Kramer',
] as const;

const ROLLEN: readonly EmployeeRol[] = ['Medewerker', 'Medewerker', 'Medewerker', 'Shiftleider', 'Trainer'];

const AVATAR_KLEUREN = [
  '#DA291C', '#FFC72C', '#2E7D32', '#1565C0', '#6A1B9A', '#EF6C00', '#00838F', '#AD1457',
] as const;

const STATUS_GEWICHTEN: Array<[StationStatus, number]> = [
  ['kent', 40],
  ['leert', 20],
  ['wil_leren', 25],
  ['nog_niet', 15],
];

function gewogenStatus(rng: () => number): StationStatus {
  const totaal = STATUS_GEWICHTEN.reduce((acc, [, gewicht]) => acc + gewicht, 0);
  let roll = rng() * totaal;
  for (const [status, gewicht] of STATUS_GEWICHTEN) {
    if (roll < gewicht) return status;
    roll -= gewicht;
  }
  return 'nog_niet';
}

function genereerMedewerkers(aantal: number): Employee[] {
  const rng = mulberry32(20260704);
  const gebruikteNamen = new Set<string>();
  const medewerkers: Employee[] = [];

  const geshuffledeVoornamen = shuffle(rng, VOORNAMEN);

  let index = 0;
  while (medewerkers.length < aantal) {
    const voornaam = geshuffledeVoornamen[index % geshuffledeVoornamen.length];
    const achternaam = pick(rng, ACHTERNAMEN);
    let volledigeNaam = `${voornaam} ${achternaam}`;
    let poging = 1;
    while (gebruikteNamen.has(volledigeNaam)) {
      poging += 1;
      volledigeNaam = `${voornaam} ${achternaam} ${poging}`;
    }
    gebruikteNamen.add(volledigeNaam);
    index += 1;

    const rol = medewerkers.length < 6 ? 'Shiftleider' : medewerkers.length === 6 ? 'Trainer' : pick(rng, ROLLEN);
    const dienstMaanden = randInt(rng, 1, 48);
    const dienstDatum = new Date();
    dienstDatum.setMonth(dienstDatum.getMonth() - dienstMaanden);

    const ervaringNiveau = rol === 'Shiftleider' || rol === 'Trainer' ? 0.75 : rng();
    const stationEntries = stations.map((station) => {
      let status = gewogenStatus(rng);
      if (ervaringNiveau > 0.6 && rng() < 0.5) status = 'kent';
      return { stationId: station.id, status };
    });

    medewerkers.push({
      id: slugify(`${volledigeNaam}-${medewerkers.length + 1}`),
      naam: volledigeNaam,
      rol,
      inDienstSinds: dienstDatum.toISOString().slice(0, 10),
      avatarKleur: pick(rng, AVATAR_KLEUREN),
      stations: stationEntries,
    });
  }

  return medewerkers.sort((a, b) => a.naam.localeCompare(b.naam, 'nl'));
}

export const employees: Employee[] = genereerMedewerkers(70);

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((employee) => employee.id === id);
}

export function aantalGekend(employee: Employee): number {
  return employee.stations.filter((entry) => entry.status === 'kent').length;
}
