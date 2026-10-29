import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Building2, PlusCircle, Users, CheckCircle, Clock } from 'lucide-react';

export function RecruiterDashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary">Recruiter Workspace</Badge>
            <Badge variant="success">Verified Employer</Badge>
          </div>
          <h2>Recruiter Portal: {user?.firstName || 'Recruiter'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Publish career opportunities, evaluate campus applicants, and manage recruitment pipelines.
          </p>
        </div>
        <Button variant="primary">
          <PlusCircle size={18} />
          Create New Job Posting
        </Button>
      </div>

      {/* Recruiter Metrics */}
      <div className="dashboard-stats-grid">
        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Building2 size={24} />
          </div>
          <div className="stat-content">
            <h4>Active Job Openings</h4>
            <div className="stat-number">3</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-400)' }}>
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Candidates</h4>
            <div className="stat-number">48</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h4>Pending Review</h4>
            <div className="stat-number">12</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h4>Offers Extended</h4>
            <div className="stat-number">5</div>
          </div>
        </Card>
      </div>

      {/* Job Management Quick View */}
      <Card style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Active Campus Job Postings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h4 style={{ fontSize: '1.1rem' }}>Graduate Software Engineer (Java / Cloud)</h4>
                <Badge variant="success">Active</Badge>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Bengaluru (Hybrid) • Full-Time • ₹12,00,000 - ₹16,00,000 PA • 24 Applicants
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                View Applicants (24)
              </Button>
              <Button variant="outline" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
