import type { GalleryImage, WorkbookFile } from '../types';

// Foto's: zet nieuwe bestanden in public/images/voorraad of public/images/personeel
// en voeg ze hieronder toe. Ontbrekende bestanden tonen automatisch een nette
// placeholder in plaats van een kapotte afbeelding.
export const voorraadFotos: GalleryImage[] = [
  { src: '/images/voorraad/koelcel-1.svg', titel: 'Koelcel 1 — zuivel & sauzen' },
  { src: '/images/voorraad/vriezer-grondstoffen.svg', titel: 'Vriezer — vlees & aardappel' },
  { src: '/images/voorraad/droogvoorraad.svg', titel: 'Droogvoorraad — brood & verpakking' },
  { src: '/images/voorraad/leveringscontrole.svg', titel: 'Leveringscontrole' },
];

export const personeelFotos: GalleryImage[] = [
  { src: '/images/personeel/team-ochtend.svg', titel: 'Ochtendploeg' },
  { src: '/images/personeel/team-keuken.svg', titel: 'Keukenteam' },
  { src: '/images/personeel/team-voorkant.svg', titel: 'Voorkant team' },
  { src: '/images/personeel/training-sessie.svg', titel: 'Trainingssessie' },
];

// Excel-bestanden: zet .xlsx-bestanden in public/data/voorraad of public/data/personeel
// en voeg ze hieronder toe. Ze worden in de browser geopend en getoond als tabel —
// er hoeft niets gedownload te worden om de inhoud te bekijken.
export const voorraadBestanden: WorkbookFile[] = [
  {
    bestand: '/data/voorraad/voorraad-voorbeeld.xlsx',
    titel: 'Voorraadoverzicht',
    omschrijving: 'Actuele voorraad, minimumniveaus en THT-datums.',
  },
];

export const personeelBestanden: WorkbookFile[] = [
  {
    bestand: '/data/personeel/personeelsrooster-voorbeeld.xlsx',
    titel: 'Personeelsrooster',
    omschrijving: 'Weekrooster met diensten en stations per medewerker.',
  },
];
