import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function Register() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'STUDENT';

  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: initialRole,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData((prev) => ({ ...prev, role: newRole }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      await register({ ...formData, role: `ROLE_${role}` });
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err?.message || 'Registration failed. Please review your input or check backend connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container auth-container" style={{ margin: '2rem auto' }}>
      <Card className="auth-card" style={{ maxWidth: '480px' }}>
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join the CareerConnect ecosystem today</p>
        </div>

        {/* Role Tab Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          padding: '0.35rem',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            type="button"
            onClick={() => handleRoleChange('STUDENT')}
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: role === 'STUDENT' ? '#fff' : 'var(--text-secondary)',
              background: role === 'STUDENT' ? 'var(--primary-600)' : 'transparent',
              transition: 'all 150ms'
            }}
          >
            I am a Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('RECRUITER')}
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: role === 'RECRUITER' ? '#fff' : 'var(--text-secondary)',
              background: role === 'RECRUITER' ? 'var(--primary-600)' : 'transparent',
              transition: 'all 150ms'
            }}
          >
            I am a Recruiter
          </button>
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

        {success && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#34d399',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="form-input"
                placeholder="Arun"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-input"
                placeholder="Kumar"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              className="form-input"
              placeholder={role === 'STUDENT' ? 'student@college.edu' : 'recruiter@company.com'}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password (Min 8 chars)</label>
            <input
              id="register-password"
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="form-input"
              placeholder="+91 98765 43210"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.8rem' }}
            disabled={submitting}
          >
            {submitting ? 'Registering Account...' : `Register as ${role === 'STUDENT' ? 'Student' : 'Recruiter'}`}
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}
