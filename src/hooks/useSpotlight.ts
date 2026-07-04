import { useEffect, useRef } from 'react';

const ACTIVE_RADIUS = 220;
const ACTIVE_FEATHER = 260;
const IDLE_TIMEOUT_MS = 1100;

/**
 * Drives the site-wide grayscale <-> color reveal effect by writing the
 * cursor position onto CSS custom properties on <html>. The actual visual
 * effect lives entirely in CSS (see .spotlight-overlay / .spotlight-glow in
 * index.css) so this hook only ever touches custom properties, never layout.
 */
export function useSpotlight(): void {
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const setPosition = (x: number, y: number) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        root.style.setProperty('--spot-x', `${x}px`);
        root.style.setProperty('--spot-y', `${y}px`);
      });
    };

    const reveal = () => {
      root.style.setProperty('--spot-r', `${ACTIVE_RADIUS}px`);
      root.style.setProperty('--spot-feather', `${ACTIVE_FEATHER}px`);
    };

    const hide = () => {
      root.style.setProperty('--spot-r', '0px');
      root.style.setProperty('--spot-feather', '0px');
    };

    const scheduleIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(hide, IDLE_TIMEOUT_MS);
    };

    const onPointerMove = (event: PointerEvent) => {
      setPosition(event.clientX, event.clientY);
      reveal();
      scheduleIdle();
    };

    const onPointerLeave = () => hide();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', hide);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', hide);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);
}
