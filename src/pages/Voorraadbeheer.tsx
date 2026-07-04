import { SectionHeader } from '../components/common/SectionHeader';
import { ImageGallery } from '../components/common/ImageGallery';
import { ExcelViewer } from '../components/common/ExcelViewer';
import { voorraadFotos, voorraadBestanden } from '../data/media';

export function Voorraadbeheer() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 animate-in">
      <SectionHeader
        kicker="Sectie 1"
        titel="Voorraadbeheer"
        omschrijving="Foto's van de opslag en het actuele voorraadoverzicht — alles direct te bekijken, niets hoeft gedownload te worden."
      />

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold opacity-90">Foto's</h2>
        <ImageGallery images={voorraadFotos} />
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold opacity-90">Excel-bestanden</h2>
        <ExcelViewer bestanden={voorraadBestanden} />
      </div>
    </div>
  );
}
