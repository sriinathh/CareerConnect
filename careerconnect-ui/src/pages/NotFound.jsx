import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Compass } from 'lucide-react';

export function NotFound() {
  return (
    <div className="container auth-container">
      <Card className="auth-card" style={{ textAlign: 'center' }}>
        <Compass size={48} style={{ color: 'var(--primary-400)', margin: '0 auto 1rem' }} />
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
        <h3 style={{ marginBottom: '1rem' }}>Page Not Found</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          The requested resource does not exist or may have been moved.
        </p>
        <Link to="/">
          <Button variant="primary" style={{ width: '100%' }}>
            Return to Homepage
          </Button>
        </Link>
      </Card>
    </div>
  );
}
