export type StationStatus = 'kent' | 'leert' | 'wil_leren' | 'nog_niet';

export interface Station {
  id: string;
  naam: string;
  omschrijving: string;
  icoon: string;
}

export interface EmployeeStationEntry {
  stationId: string;
  status: StationStatus;
}

export type EmployeeRol = 'Medewerker' | 'Shiftleider' | 'Trainer';

export interface Employee {
  id: string;
  naam: string;
  rol: EmployeeRol;
  inDienstSinds: string;
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
