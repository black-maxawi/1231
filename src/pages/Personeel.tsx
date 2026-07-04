import { SectionHeader } from '../components/common/SectionHeader';
import { ImageGallery } from '../components/common/ImageGallery';
import { ExcelViewer } from '../components/common/ExcelViewer';
import { personeelFotos, personeelBestanden } from '../data/media';

export function Personeel() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 animate-in">
      <SectionHeader
        kicker="Sectie 2"
        titel="Personeel"
        omschrijving="Teamfoto's en het personeelsrooster — overzichtelijk en direct te bekijken, zonder iets te downloaden."
      />

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold opacity-90">Foto's</h2>
        <ImageGallery images={personeelFotos} />
      </div>

      <div className="mt-14">
        <h2 className="mb-4 text-lg font-semibold opacity-90">Excel-bestanden</h2>
        <ExcelViewer bestanden={personeelBestanden} />
      </div>
    </div>
  );
}
