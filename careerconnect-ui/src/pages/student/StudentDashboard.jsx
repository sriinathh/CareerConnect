import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>Student Workspace</Badge>
          <h2>Welcome back, {user?.firstName || 'Student'}!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Track your campus placement journey, manage resumes, and apply for verified corporate openings.
          </p>
        </div>
        <Link to="/jobs">
          <Button variant="primary">
            <Briefcase size={18} />
            Explore New Openings
          </Button>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="dashboard-stats-grid">
        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-400)' }}>
            <Briefcase size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Applications</h4>
            <div className="stat-number">4</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h4>Under Review</h4>
            <div className="stat-number">2</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-content">
            <h4>Shortlisted</h4>
            <div className="stat-number">1</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h4>Active Resumes</h4>
            <div className="stat-number">2</div>
          </div>
        </Card>
      </div>

      {/* Profile Health & Roadmap */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Sparkles size={22} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Placement Profile Status</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Your student profile is <strong style={{ color: '#fff' }}>85% complete</strong>. Adding GitHub and LinkedIn links improves recruiter visibility by 40%.
          </p>
          <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--primary-500), var(--accent-cyan))' }} />
          </div>
          <Button variant="secondary" style={{ width: '100%' }}>
            Edit Academic Profile
          </Button>
        </Card>

        <Card style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <FileText size={22} style={{ color: 'var(--primary-400)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Resume Management</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Upload targeted versions of your resume (PDF/DOCX up to 5MB). Set a default resume for rapid 1-click applications.
          </p>
          <div style={{ padding: '0.85rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Default: SDE_Resume_2026.pdf</span>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
          <Button variant="outline" style={{ width: '100%' }}>
            Upload New Resume
          </Button>
        </Card>
      </div>
    </div>
  );
}
