import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Authentication failed. Please verify credentials or ensure backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('Password@123');
  };

  return (
    <div className="container auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your CareerConnect workspace</p>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#fb7185',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="name@college.edu or name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Quick-Fill Role Credentials (Demo):
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={() => fillDemo('student@college.edu')}
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-300)', borderRadius: '4px' }}>
              Student
            </button>
            <button 
              type="button" 
              onClick={() => fillDemo('recruiter@techcorp.com')}
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', borderRadius: '4px' }}>
              Recruiter
            </button>
            <button 
              type="button" 
              onClick={() => fillDemo('admin@careerconnect.org')}
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', borderRadius: '4px' }}>
              Admin
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
}
