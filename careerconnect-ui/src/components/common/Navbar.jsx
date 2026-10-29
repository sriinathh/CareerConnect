import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from './Button';
import { Briefcase, User, ShieldCheck, LogOut, LogIn } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">CC</div>
          <span>Career<span className="gradient-text">Connect</span></span>
        </Link>

        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-link">Browse Jobs</Link>
            </li>
            {isAuthenticated && hasRole('STUDENT') && (
              <li>
                <Link to="/student/dashboard" className="nav-link">Student Portal</Link>
              </li>
            )}
            {isAuthenticated && hasRole('RECRUITER') && (
              <li>
                <Link to="/recruiter/dashboard" className="nav-link">Recruiter Portal</Link>
              </li>
            )}
            {isAuthenticated && hasRole('ADMIN') && (
              <li>
                <Link to="/admin/dashboard" className="nav-link">Admin Console</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {user?.firstName || user?.email}
              </span>
              <Button variant="secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" style={{ padding: '0.5rem 1rem' }}>
                  <LogIn size={16} />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" style={{ padding: '0.5rem 1rem' }}>
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
