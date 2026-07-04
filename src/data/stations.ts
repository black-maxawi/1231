import type { Station } from '../types';

export const stations: Station[] = [
  {
    id: 'kassa-voorkant',
    naam: 'Kassa Voorkant',
    omschrijving: 'Bestellingen opnemen en afrekenen aan de balie.',
    icoon: '🧾',
  },
  {
    id: 'drive-thru',
    naam: 'Drive-thru',
    omschrijving: 'Bestellingen opnemen en uitgeven bij de drive-thru.',
    icoon: '🚗',
  },
  {
    id: 'grill',
    naam: 'Grill',
    omschrijving: 'Vlees en kip bereiden op de grill.',
    icoon: '🍔',
  },
  {
    id: 'frituur',
    naam: 'Frituur',
    omschrijving: 'Friet en andere gefrituurde producten bereiden.',
    icoon: '🍟',
  },
  {
    id: 'assemblage',
    naam: 'Assemblage',
    omschrijving: 'Broodjes samenstellen en verpakken.',
    icoon: '🥪',
  },
  {
    id: 'mccafe',
    naam: 'McCafé',
    omschrijving: 'Koffie en dranken bereiden aan de McCafé.',
    icoon: '☕',
  },
  {
    id: 'voorraadbeheer',
    naam: 'Voorraadbeheer',
    omschrijving: 'Bevoorrading, tellingen en bestellingen beheren.',
    icoon: '📦',
  },
  {
    id: 'bezorging',
    naam: 'Bezorging',
    omschrijving: 'McDelivery-bestellingen verwerken en klaarzetten.',
    icoon: '🛵',
  },
  {
    id: 'lobby',
    naam: 'Lobby & Schoonmaak',
    omschrijving: 'Restaurant schoonhouden en klantvriendelijkheid in de lobby.',
    icoon: '🧽',
  },
  {
    id: 'leidinggeven',
    naam: 'Leidinggeven',
    omschrijving: 'Een shift aansturen en het team coördineren.',
    icoon: '⭐',
  },
];

export const statusVolgorde = ['kent', 'leert', 'wil_leren', 'nog_niet'] as const;

export const statusLabels: Record<string, string> = {
  kent: 'Kent het station',
  leert: 'Is het aan het leren',
  wil_leren: 'Wil het leren',
  nog_niet: 'Nog niet gestart',
};
