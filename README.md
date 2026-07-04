# McDonald's Lange Vie Utrecht — Personeelsportaal

Intern portaal met drie secties:

- **Voorraadbeheer** — foto's van de opslag + het voorraadoverzicht als Excel, direct te bekijken in de browser.
- **Personeel** — teamfoto's + het personeelsrooster als Excel, direct te bekijken in de browser.
- **Training** — alle medewerkers, elk met een eigen pagina die per station laat zien: getraind (met score) of nog te leren.

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

## Trainingsdata bijwerken

`src/data/stations.ts` en `src/data/employees.ts` worden automatisch gegenereerd uit het echte brondocument `public/data/training/allround-overzicht-utrecht.xlsx` (tabblad "📋 Overzicht": naam + per station een score 0–1, of leeg/"—"/"❌" als het station nog niet getraind is).

Werk je het rooster bij (nieuwe medewerker, nieuwe scores)? Vervang dat Excel-bestand door de bijgewerkte versie en draai:

```bash
npm run import:training-data
```

Dit herschrijft `src/data/stations.ts` en `src/data/employees.ts` — handmatige aanpassingen in die twee bestanden gaan dan verloren, dus pas liever het Excel-bestand aan. "Allround" betekent ≥ 10 van de 12 stations getraind, zoals in het brondocument.

## Live preview delen (Artifact)

Wil je iemand het resultaat laten zien zonder dat ze iets hoeven te installeren? Bouw een enkel, volledig offline HTML-bestand (alle foto's en Excel-data zitten er als data ingebakken in, geen server nodig):

```bash
npm run build:artifact
```

Dit levert `dist-artifact/index.html` op — één bestand dat je overal kunt openen of hosten.

## Techniek

- Vite + React + TypeScript + React Router
- Tailwind CSS v4
- Framer Motion voor animaties
- `xlsx` (SheetJS) voor het lezen/tonen van Excel-bestanden in de browser — bewust alleen voor door het team zelf aangeleverde bestanden (geen publieke upload-endpoint), omdat het pakket geen recente CVE-fix op npm heeft.
- De kleur/grijs-cursoreffect zit volledig in CSS (`.spotlight-overlay` / `.spotlight-glow` in `src/index.css`) en wordt alleen aangestuurd via CSS-variabelen vanuit `src/hooks/useSpotlight.ts` — geen herhaalde re-renders, dus soepel op elk apparaat.
