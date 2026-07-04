import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryImage } from '../../types';
import { resolveImageSrc } from '../../lib/resolveImageSrc';

function GalleryThumb({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  const [broken, setBroken] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-left transition-all duration-300 hover:-translate-y-1 hover:border-mc-gold/40 hover:shadow-[0_12px_30px_-8px_rgba(255,199,44,0.35)]"
    >
      {broken ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center opacity-60">
          <span className="text-3xl">🖼️</span>
          <span className="text-xs">Nog geen foto toegevoegd</span>
        </div>
      ) : (
        <img
          src={resolveImageSrc(image.src)}
          alt={image.titel}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="text-sm font-medium text-white">{image.titel}</p>
      </div>
    </button>
  );
}

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <GalleryThumb key={image.src} image={image} onClick={() => setActive(image)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-mc-ink"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={resolveImageSrc(active.src)} alt={active.titel} className="max-h-[75vh] w-full object-contain" />
              <figcaption className="flex items-center justify-between gap-4 p-4 text-sm">
                <span className="font-medium">{active.titel}</span>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs opacity-80 hover:opacity-100"
                >
                  Sluiten
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
