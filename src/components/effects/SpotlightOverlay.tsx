import { useSpotlight } from '../../hooks/useSpotlight';

/**
 * Site-wide cursor effect: the page is grayscale by default and blooms into
 * full color in a soft circle around the pointer. Move away (or go idle) and
 * it fades back to black & white. Purely decorative, pointer-events: none,
 * so it never interferes with clicks, forms, or the Excel viewer beneath it.
 */
export function SpotlightOverlay() {
  useSpotlight();
  return (
    <>
      <div className="spotlight-glow" aria-hidden="true" />
      <div className="spotlight-overlay" aria-hidden="true" />
    </>
  );
}
