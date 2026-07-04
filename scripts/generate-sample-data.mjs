// Genereert voorbeeld Excel-bestanden voor de Voorraadbeheer- en Personeel-secties.
// Vervang deze bestanden gerust door de echte werkbladen van het restaurant:
// zelfde bestandsnamen in public/data/voorraad en public/data/personeel, of
// pas src/data/media.ts aan met nieuwe bestandsnamen.
import * as XLSX from 'xlsx';
import { mkdirSync } from 'node:fs';

mkdirSync('public/data/voorraad', { recursive: true });
mkdirSync('public/data/personeel', { recursive: true });

const voorraad = [
  ['Product', 'Categorie', 'Voorraad', 'Eenheid', 'Minimum', 'THT-datum', 'Locatie'],
  ['Rundvleespatty 100g', 'Vlees', 420, 'stuks', 150, '2026-07-18', 'Vriezer 1'],
  ['Kipfilet burger', 'Vlees', 180, 'stuks', 100, '2026-07-15', 'Vriezer 2'],
  ['Frites (diepvries)', 'Aardappel', 640, 'kg', 200, '2026-08-02', 'Vriezer 3'],
  ['Sesambroodje groot', 'Brood', 300, 'stuks', 120, '2026-07-10', 'Droogvoorraad'],
  ['Sesambroodje klein', 'Brood', 260, 'stuks', 100, '2026-07-10', 'Droogvoorraad'],
  ['Cheddar kaasplak', 'Zuivel', 900, 'stuks', 300, '2026-07-22', 'Koelcel 1'],
  ['Slamix', 'Groente', 45, 'kg', 20, '2026-07-08', 'Koelcel 2'],
  ['Tomaten (gesneden)', 'Groente', 38, 'kg', 15, '2026-07-07', 'Koelcel 2'],
  ['Cola siroop (BiB)', 'Dranken', 22, 'bag-in-box', 8, '2026-11-01', 'Drankopslag'],
  ['Koffiebonen McCafé', 'Dranken', 34, 'kg', 12, '2027-01-15', 'Droogvoorraad'],
  ['Milkshake mix aardbei', 'Dranken', 16, 'liter', 6, '2026-09-20', 'Koelcel 1'],
  ['Verpakking burgerbox', 'Verpakking', 1200, 'stuks', 400, '', 'Magazijn'],
  ['Frietbakjes klein', 'Verpakking', 2100, 'stuks', 600, '', 'Magazijn'],
  ['Servetten', 'Verpakking', 5400, 'stuks', 1000, '', 'Magazijn'],
];

const personeel = [
  ['Naam', 'Rol', 'Dag', 'Starttijd', 'Eindtijd', 'Station'],
  ['Lars de Vries', 'Shiftleider', 'Maandag', '08:00', '16:00', 'Leidinggeven'],
  ['Sanne Jansen', 'Trainer', 'Maandag', '09:00', '17:00', 'Grill'],
  ['Daan Bakker', 'Medewerker', 'Maandag', '11:00', '19:00', 'Kassa Voorkant'],
  ['Emma Visser', 'Medewerker', 'Maandag', '14:00', '22:00', 'Drive-thru'],
  ['Sem Smit', 'Medewerker', 'Dinsdag', '08:00', '16:00', 'Frituur'],
  ['Julia Meijer', 'Medewerker', 'Dinsdag', '12:00', '20:00', 'McCafé'],
  ['Milan de Boer', 'Shiftleider', 'Woensdag', '08:00', '16:00', 'Leidinggeven'],
  ['Sophie Mulder', 'Medewerker', 'Woensdag', '10:00', '18:00', 'Assemblage'],
  ['Bram de Groot', 'Medewerker', 'Donderdag', '15:00', '23:00', 'Bezorging'],
  ['Tess Bos', 'Medewerker', 'Vrijdag', '16:00', '00:00', 'Lobby & Schoonmaak'],
  ['Noah Vos', 'Medewerker', 'Zaterdag', '11:00', '19:00', 'Voorraadbeheer'],
  ['Nina Peters', 'Medewerker', 'Zondag', '12:00', '20:00', 'Kassa Voorkant'],
];

function schrijf(pad, rijen, sheetNaam) {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rijen);
  sheet['!cols'] = rijen[0].map((_, colIndex) => ({
    wch: Math.max(12, ...rijen.map((rij) => String(rij[colIndex] ?? '').length + 2)),
  }));
  XLSX.utils.book_append_sheet(workbook, sheet, sheetNaam);
  XLSX.writeFile(workbook, pad);
  console.log('Geschreven:', pad);
}

schrijf('public/data/voorraad/voorraad-voorbeeld.xlsx', voorraad, 'Voorraad');
schrijf('public/data/personeel/personeelsrooster-voorbeeld.xlsx', personeel, 'Rooster');
