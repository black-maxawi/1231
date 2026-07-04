import { mkdirSync, writeFileSync } from 'node:fs';

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function svg(title, subtitle, emoji, from, to) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="700" cy="80" r="140" fill="#ffffff" opacity="0.08"/>
  <circle cx="60" cy="540" r="180" fill="#000000" opacity="0.08"/>
  <text x="400" y="260" font-size="120" text-anchor="middle" font-family="system-ui,sans-serif">${escapeXml(emoji)}</text>
  <text x="400" y="360" font-size="34" font-weight="700" fill="#0d0b08" text-anchor="middle" font-family="system-ui,sans-serif">${escapeXml(title)}</text>
  <text x="400" y="400" font-size="20" fill="#0d0b08" opacity="0.7" text-anchor="middle" font-family="system-ui,sans-serif">${escapeXml(subtitle)}</text>
</svg>`;
}

mkdirSync('public/images/voorraad', { recursive: true });
mkdirSync('public/images/personeel', { recursive: true });

const voorraad = [
  ['koelcel-1', 'Koelcel 1', 'Zuivel & sauzen', '🧊', '#8ec9ff', '#ffc72c'],
  ['vriezer-grondstoffen', 'Vriezer grondstoffen', 'Vlees & aardappel', '🥩', '#ffb199', '#ffc72c'],
  ['droogvoorraad', 'Droogvoorraad', 'Brood & verpakking', '📦', '#ffe08a', '#da291c'],
  ['leveringscontrole', 'Leveringscontrole', 'Inkomende bestelling', '🚚', '#b7f0c0', '#1565c0'],
];
const personeel = [
  ['team-ochtend', 'Ochtendploeg', 'Openingsteam', '🌅', '#ffe08a', '#da291c'],
  ['team-keuken', 'Keukenteam', 'Grill & assemblage', '👩‍🍳', '#ffb199', '#ffc72c'],
  ['team-voorkant', 'Voorkant team', 'Kassa & McCafé', '🧑‍💼', '#8ec9ff', '#1565c0'],
  ['training-sessie', 'Trainingssessie', 'Nieuwe medewerkers', '🎓', '#b7f0c0', '#2e7d32'],
];

for (const [file, title, subtitle, emoji, from, to] of voorraad) {
  writeFileSync(`public/images/voorraad/${file}.svg`, svg(title, subtitle, emoji, from, to));
}
for (const [file, title, subtitle, emoji, from, to] of personeel) {
  writeFileSync(`public/images/personeel/${file}.svg`, svg(title, subtitle, emoji, from, to));
}
console.log('Voorbeeldafbeeldingen gegenereerd.');
