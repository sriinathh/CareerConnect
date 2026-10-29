import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
