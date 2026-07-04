# McDonald's Lange Vie Utrecht — Personeelsportaal

Intern portaal met drie secties:

- **Voorraadbeheer** — foto's van de opslag + het voorraadoverzicht als Excel, direct te bekijken in de browser.
- **Personeel** — teamfoto's + het personeelsrooster als Excel, direct te bekijken in de browser.
- **Training** — 70 medewerkers, elk met een eigen pagina die laat zien welke stations ze al kennen en welke ze nog willen leren.

De hele site is grijstinten totdat je met je muis beweegt: dan verschijnt er een cirkel van kleur rond de cursor, die weer wegvloeit zodra de muis stilstaat of het venster verlaat.

## Starten

```bash
npm install
npm run dev
```

Productie-build:

```bash
npm run build
npm run preview
```

## Eigen foto's en Excel-bestanden toevoegen

Alles staat in `public/`, dus je hoeft niets te compileren om content te vervangen.

- **Foto's**: zet een `.jpg`/`.png`/`.webp` in `public/images/voorraad/` of `public/images/personeel/`, en voeg een regel toe in `src/data/media.ts`. Ontbrekende afbeeldingen tonen automatisch een nette "nog geen foto" placeholder in plaats van een kapot icoon.
- **Excel-bestanden**: zet een `.xlsx` in `public/data/voorraad/` of `public/data/personeel/`, en voeg een regel toe in `src/data/media.ts`. Bezoekers kunnen ook zelf een bestand slepen/kiezen om het direct te bekijken (dit blijft lokaal in de browser, er wordt niets geüpload).
- De meegeleverde bestanden zijn voorbeelddata, gegenereerd via `scripts/generate-sample-data.mjs` en `scripts/generate-sample-images.mjs`. Vervang ze gerust door de echte bestanden van het restaurant.

## Trainingsdata aanpassen

- Stations (de McDonald's-werkplekken): `src/data/stations.ts`.
- De 70 medewerkers worden gegenereerd in `src/data/employees.ts` met een vaste "seed", zodat de data stabiel blijft. Wil je echte namen en echte trainingsstatus per medewerker? Vervang de inhoud van `employees` daar door je eigen array (zelfde vorm: naam, rol, en per station een status `kent` / `leert` / `wil_leren` / `nog_niet`).

## Techniek

- Vite + React + TypeScript + React Router
- Tailwind CSS v4
- Framer Motion voor animaties
- `xlsx` (SheetJS) voor het lezen/tonen van Excel-bestanden in de browser — bewust alleen voor door het team zelf aangeleverde bestanden (geen publieke upload-endpoint), omdat het pakket geen recente CVE-fix op npm heeft.
- De kleur/grijs-cursoreffect zit volledig in CSS (`.spotlight-overlay` / `.spotlight-glow` in `src/index.css`) en wordt alleen aangestuurd via CSS-variabelen vanuit `src/hooks/useSpotlight.ts` — geen herhaalde re-renders, dus soepel op elk apparaat.
