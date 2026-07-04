import { embeddedImages } from '../data/embeddedImages.generated';

/** In the offline single-file artifact build there is no server to fetch
 * /images/... from, so those paths are swapped for pre-embedded data URIs. */
export function resolveImageSrc(src: string): string {
  if (__ARTIFACT__) return embeddedImages[src] ?? src;
  return src;
}
