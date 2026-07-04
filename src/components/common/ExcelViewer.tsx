import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { WorkbookFile } from '../../types';
import { embeddedWorkbooks } from '../../data/embeddedWorkbooks.generated';

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const MAX_ROWS_SHOWN = 1000;

interface SheetTable {
  naam: string;
  rijen: string[][];
  afgekapt: boolean;
}

interface Workbook {
  titel: string;
  omschrijving?: string;
  sheets: SheetTable[];
}

type LoadState =
  | { status: 'laden' }
  | { status: 'ontbreekt' }
  | { status: 'fout'; melding: string }
  | { status: 'klaar'; workbook: Workbook };

async function parseWorkbook(data: ArrayBuffer): Promise<SheetTable[]> {
  const XLSX = await import('xlsx');
  const wb = XLSX.read(data, { type: 'array', cellFormula: false, cellHTML: false });
  return wb.SheetNames.map((naam) => {
    const sheet = wb.Sheets[naam];
    const alleRijen = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      blankrows: false,
      defval: '',
    });
    const afgekapt = alleRijen.length > MAX_ROWS_SHOWN;
    const rijen = (afgekapt ? alleRijen.slice(0, MAX_ROWS_SHOWN) : alleRijen).map((rij) =>
      rij.map((cel) => (cel instanceof Date ? cel.toLocaleDateString('nl-NL') : String(cel))),
    );
    return { naam, rijen, afgekapt };
  });
}

function useWorkbookFromUrl(file: WorkbookFile): LoadState {
  const [state, setState] = useState<LoadState>({ status: 'laden' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'laden' });

    if (__ARTIFACT__) {
      const sheets = embeddedWorkbooks[file.bestand];
      if (sheets) setState({ status: 'klaar', workbook: { titel: file.titel, omschrijving: file.omschrijving, sheets } });
      else setState({ status: 'ontbreekt' });
      return;
    }

    fetch(file.bestand)
      .then((response) => {
        if (response.status === 404) throw new Error('ONTBREEKT');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.arrayBuffer();
      })
      .then(async (buffer) => {
        const sheets = await parseWorkbook(buffer);
        if (cancelled) return;
        setState({ status: 'klaar', workbook: { titel: file.titel, omschrijving: file.omschrijving, sheets } });
      })
      .catch((error: Error) => {
        if (cancelled) return;
        if (error.message === 'ONTBREEKT') setState({ status: 'ontbreekt' });
        else setState({ status: 'fout', melding: 'Kon het bestand niet lezen.' });
      });

    return () => {
      cancelled = true;
    };
  }, [file.bestand, file.titel, file.omschrijving]);

  return state;
}

function SheetTableView({ sheet }: { sheet: SheetTable }) {
  const [zoekterm, setZoekterm] = useState('');
  const [koprij, ...dataRijen] = sheet.rijen;

  const gefilterdeRijen = useMemo(() => {
    if (!zoekterm.trim()) return dataRijen;
    const term = zoekterm.toLowerCase();
    return dataRijen.filter((rij) => rij.some((cel) => cel.toLowerCase().includes(term)));
  }, [dataRijen, zoekterm]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3">
        <input
          value={zoekterm}
          onChange={(event) => setZoekterm(event.target.value)}
          placeholder="Zoeken in tabel…"
          className="w-full max-w-xs rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm outline-none placeholder:opacity-50 focus:border-mc-gold/60"
        />
        <span className="shrink-0 text-xs opacity-50">
          {gefilterdeRijen.length} van {dataRijen.length} rijen
        </span>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full min-w-max border-collapse text-sm">
          {koprij && (
            <thead className="sticky top-0 z-10 bg-mc-ink/95 backdrop-blur">
              <tr>
                {koprij.map((cel, i) => (
                  <th key={i} className="whitespace-nowrap border-b border-white/10 px-3 py-2 text-left font-semibold text-mc-gold">
                    {cel || `Kolom ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {gefilterdeRijen.map((rij, ri) => (
              <tr key={ri} className="odd:bg-white/[0.02] hover:bg-mc-gold/5">
                {rij.map((cel, ci) => (
                  <td key={ci} className="whitespace-nowrap border-b border-white/5 px-3 py-2">
                    {cel}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sheet.afgekapt && (
        <p className="border-t border-white/10 p-2 text-center text-xs opacity-50">
          Alleen de eerste {MAX_ROWS_SHOWN} rijen worden getoond.
        </p>
      )}
    </div>
  );
}

function ManifestWorkbookCard({ file }: { file: WorkbookFile }) {
  const state = useWorkbookFromUrl(file);
  const [actieveSheet, setActieveSheet] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 p-4">
        <h3 className="font-semibold text-mc-paper">{file.titel}</h3>
        {file.omschrijving && <p className="text-sm opacity-60">{file.omschrijving}</p>}
      </div>

      {state.status === 'laden' && (
        <div className="flex items-center gap-3 p-6 text-sm opacity-60">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-mc-gold border-t-transparent" />
          Bestand wordt geladen…
        </div>
      )}

      {state.status === 'ontbreekt' && (
        <div className="p-6 text-sm opacity-60">
          <p>Dit bestand is nog niet toegevoegd.</p>
          <p className="mt-1 font-mono text-xs opacity-50">public{file.bestand}</p>
        </div>
      )}

      {state.status === 'fout' && <div className="p-6 text-sm text-mc-red">{state.melding}</div>}

      {state.status === 'klaar' && (
        <div>
          {state.workbook.sheets.length > 1 && (
            <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-3 pt-3">
              {state.workbook.sheets.map((sheet, i) => (
                <button
                  key={sheet.naam}
                  onClick={() => setActieveSheet(i)}
                  className={`shrink-0 rounded-t-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    i === actieveSheet ? 'bg-mc-gold/15 text-mc-gold' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {sheet.naam}
                </button>
              ))}
            </div>
          )}
          <SheetTableView sheet={state.workbook.sheets[actieveSheet]} />
        </div>
      )}
    </div>
  );
}

function UploadWorkbookCard() {
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [actieveSheet, setActieveSheet] = useState(0);
  const [melding, setMelding] = useState<string | null>(null);
  const [dragActief, setDragActief] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const laadBestand = useCallback((bestand: File) => {
    setMelding(null);
    if (!/\.(xlsx|xls|csv)$/i.test(bestand.name)) {
      setMelding('Alleen .xlsx, .xls of .csv bestanden worden ondersteund.');
      return;
    }
    if (bestand.size > MAX_UPLOAD_BYTES) {
      setMelding('Bestand is groter dan 15 MB.');
      return;
    }
    bestand
      .arrayBuffer()
      .then(async (buffer) => {
        const sheets = await parseWorkbook(buffer);
        setWorkbook({ titel: bestand.name, sheets });
        setActieveSheet(0);
      })
      .catch(() => setMelding('Kon dit bestand niet openen.'));
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02]">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActief(true);
        }}
        onDragLeave={() => setDragActief(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActief(false);
          const bestand = event.dataTransfer.files[0];
          if (bestand) laadBestand(bestand);
        }}
        className={`flex flex-col items-center gap-2 p-8 text-center transition-colors ${dragActief ? 'bg-mc-gold/10' : ''}`}
      >
        <span className="text-3xl">📊</span>
        <p className="text-sm opacity-70">Sleep hier een eigen Excel-bestand, of</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-mc-gold px-4 py-1.5 text-sm font-semibold text-mc-ink transition-transform hover:scale-105"
        >
          Kies bestand
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(event) => {
            const bestand = event.target.files?.[0];
            if (bestand) laadBestand(bestand);
          }}
        />
        <p className="text-xs opacity-40">Wordt alleen lokaal in de browser bekeken, niet geüpload.</p>
        {melding && <p className="text-xs text-mc-red">{melding}</p>}
      </div>

      {workbook && (
        <div className="border-t border-white/10">
          <div className="flex items-center justify-between px-4 pt-3">
            <h3 className="font-semibold">{workbook.titel}</h3>
            <button onClick={() => setWorkbook(null)} className="text-xs opacity-50 hover:opacity-90">
              Sluiten
            </button>
          </div>
          {workbook.sheets.length > 1 && (
            <div className="flex gap-1 overflow-x-auto px-3 pt-2">
              {workbook.sheets.map((sheet, i) => (
                <button
                  key={sheet.naam}
                  onClick={() => setActieveSheet(i)}
                  className={`shrink-0 rounded-t-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    i === actieveSheet ? 'bg-mc-gold/15 text-mc-gold' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {sheet.naam}
                </button>
              ))}
            </div>
          )}
          <SheetTableView sheet={workbook.sheets[actieveSheet]} />
        </div>
      )}
    </div>
  );
}

export function ExcelViewer({ bestanden }: { bestanden: WorkbookFile[] }) {
  return (
    <div className="flex flex-col gap-6">
      {bestanden.map((file) => (
        <ManifestWorkbookCard key={file.bestand} file={file} />
      ))}
      <UploadWorkbookCard />
    </div>
  );
}
