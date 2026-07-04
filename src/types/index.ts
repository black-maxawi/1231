export interface Station {
  id: string;
  naam: string;
  omschrijving: string;
  icoon: string;
}

export interface EmployeeStationEntry {
  stationId: string;
  /** Getrainde vaardigheidsscore 0–1, of null als het station nog niet getraind is. */
  score: number | null;
}

export interface Employee {
  id: string;
  naam: string;
  avatarKleur: string;
  stations: EmployeeStationEntry[];
}

export interface GalleryImage {
  src: string;
  titel: string;
}

export interface WorkbookFile {
  bestand: string;
  titel: string;
  omschrijving: string;
}
