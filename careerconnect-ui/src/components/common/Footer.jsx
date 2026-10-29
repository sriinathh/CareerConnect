export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p>© {new Date().getFullYear()} CareerConnect. Final-Year CSE Capstone Project.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Built with Spring Boot 3, PostgreSQL, React &amp; Vite.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <a href="/docs/architecture.md" target="_blank" rel="noreferrer" style={{ transition: 'color 150ms' }}>
            Architecture Docs
          </a>
          <a href="/docs/api-documentation.md" target="_blank" rel="noreferrer" style={{ transition: 'color 150ms' }}>
            API Specification
          </a>
          <a href="/docs/database-design.md" target="_blank" rel="noreferrer" style={{ transition: 'color 150ms' }}>
            Database Schema
          </a>
        </div>
      </div>
    </footer>
  );
}
