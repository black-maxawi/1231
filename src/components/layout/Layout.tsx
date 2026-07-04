import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SpotlightOverlay } from '../effects/SpotlightOverlay';

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-mc-ink text-mc-paper">
      <SpotlightOverlay />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
