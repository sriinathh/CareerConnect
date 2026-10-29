import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ShieldCheck, Users, Building2, TrendingUp, AlertCircle, Check, X } from 'lucide-react';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="warning" style={{ marginBottom: '0.5rem' }}>Campus Placement Cell</Badge>
          <h2>Administrator Governance Console</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Supervise recruiter verifications, student placements, and campus analytics.
          </p>
        </div>
        <Button variant="secondary">
          <Users size={18} />
          User Registry
        </Button>
      </div>

      {/* Analytics KPI Grid */}
      <div className="dashboard-stats-grid">
        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-400)' }}>
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h4>Total Enrolled Students</h4>
            <div className="stat-number">450</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
            <Building2 size={24} />
          </div>
          <div className="stat-content">
            <h4>Verified Companies</h4>
            <div className="stat-number">28</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h4>Placement Rate</h4>
            <div className="stat-number">78.4%</div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h4>Pending Verifications</h4>
            <div className="stat-number">3</div>
          </div>
        </Card>
      </div>

      {/* Recruiter Verification Queue */}
      <Card style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Recruiter Verification Queue</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Corporate employers awaiting institutional authorization before posting campus jobs.
            </p>
          </div>
          <Badge variant="warning">3 Awaiting Action</Badge>
        </div>

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
                <h4 style={{ fontSize: '1.05rem' }}>TechCorp Global Solutions</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered 2 hrs ago</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Contact: recruiter@techcorp.com • Website: techcorpglobal.com • Designation: University Talent Lead
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', background: 'var(--accent-emerald)' }}>
                <Check size={16} />
                Approve
              </Button>
              <Button variant="secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                <X size={16} />
                Reject
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
