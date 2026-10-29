import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { jobService } from '../services/jobService';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Server, 
  Cpu, 
  Lock 
} from 'lucide-react';

export function Home() {
  const [apiHealth, setApiHealth] = useState({
    status: 'CHECKING',
    message: 'Testing connection to Spring Boot backend...',
    timestamp: null,
  });

  useEffect(() => {
    let isMounted = true;
    jobService.checkApiHealth()
      .then((res) => {
        if (isMounted) {
          setApiHealth({
            status: 'ONLINE',
            message: res.message || 'Spring Boot API is operational',
            timestamp: res.data?.timestamp || new Date().toISOString(),
            version: res.data?.version || '1.0.0-SNAPSHOT',
            environment: res.data?.environment || 'dev',
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setApiHealth({
            status: 'OFFLINE',
            message: 'Backend server offline (Run: mvn spring-boot:run)',
            timestamp: null,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pill">
          <Activity size={16} />
          <span>Final-Year CSE Capstone Project • Spring Boot 3 + React</span>
        </div>

        <h1 className="hero-title">
          Connecting Campus Talent with <br />
          <span className="gradient-text">Premier Global Employers</span>
        </h1>

        <p className="hero-subtitle">
          An enterprise-grade, role-based job portal and campus placement ecosystem.
          Streamlining candidate profiling, verified recruiter onboarding, and placement analytics.
        </p>

        <div className="hero-cta-group">
          <Link to="/register">
            <Button variant="primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              Get Started Now
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
              Browse Job Openings
            </Button>
          </Link>
        </div>

        {/* Real-time Backend Health Status Bar */}
        <Card className="status-box">
          <div className="status-indicator">
            <div 
              className="status-dot" 
              style={{
                backgroundColor: apiHealth.status === 'ONLINE' ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                boxShadow: apiHealth.status === 'ONLINE' ? '0 0 10px var(--accent-emerald)' : '0 0 10px var(--accent-amber)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Spring Boot Backend Status:</span>
                <Badge variant={apiHealth.status === 'ONLINE' ? 'success' : 'warning'}>
                  {apiHealth.status}
                </Badge>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                {apiHealth.message}
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: /api/v1/health</span>
          </div>
        </Card>
      </section>

      {/* Role Architecture Cards */}
      <section style={{ marginTop: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2>Platform Role Ecosystem</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Fine-grained access control tailored for all campus recruitment participants.
          </p>
        </div>

        <div className="role-cards-grid">
          {/* Student Role */}
          <Card className="role-card">
            <div className="role-card-icon icon-student">
              <GraduationCap size={28} />
            </div>
            <h3>Student Portal</h3>
            <p>
              Build comprehensive academic profiles, upload verified resumes, discover openings, and monitor live application statuses.
            </p>
            <ul>
              <li>Academic CGPA &amp; Skill Verification</li>
              <li>Multi-version Resume Management</li>
              <li>1-Click Job Applications</li>
              <li>Real-time Application Stage Tracker</li>
            </ul>
            <Link to="/register?role=STUDENT">
              <Button variant="outline" style={{ width: '100%' }}>
                Student Registration
              </Button>
            </Link>
          </Card>

          {/* Recruiter Role */}
          <Card className="role-card">
            <div className="role-card-icon icon-recruiter">
              <Building2 size={28} />
            </div>
            <h3>Recruiter Workspace</h3>
            <p>
              Showcase verified employer profiles, post multi-tier job openings, screen student applicants, and update hiring pipelines.
            </p>
            <ul>
              <li>Corporate Profile Verification</li>
              <li>Full Job Posting Lifecycle Management</li>
              <li>Applicant Screening &amp; Filtering</li>
              <li>Shortlisting &amp; Interview Management</li>
            </ul>
            <Link to="/register?role=RECRUITER">
              <Button variant="outline" style={{ width: '100%' }}>
                Recruiter Onboarding
              </Button>
            </Link>
          </Card>

          {/* Admin Role */}
          <Card className="role-card">
            <div className="role-card-icon icon-admin">
              <ShieldCheck size={28} />
            </div>
            <h3>Placement Administration</h3>
            <p>
              Institutional oversight to verify corporate recruiters, moderate campus postings, manage users, and inspect placement metrics.
            </p>
            <ul>
              <li>Recruiter Credential Vetting</li>
              <li>Job Moderation &amp; Policy Governance</li>
              <li>Role-Based User Management</li>
              <li>Campus Placement Analytics Dashboard</li>
            </ul>
            <Link to="/login">
              <Button variant="outline" style={{ width: '100%' }}>
                Admin Portal Access
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Engineering Highlights */}
      <section style={{ margin: '6rem 0 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2>Engineering Specifications</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Built strictly adhering to professional enterprise software development standards.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <Card style={{ padding: '1.5rem' }}>
            <Server style={{ color: 'var(--primary-400)', marginBottom: '0.75rem' }} size={26} />
            <h4 style={{ marginBottom: '0.35rem' }}>Layered Spring Boot 3 API</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Controller → Service → Repository pattern with zero entity leakage and DTO request validation.
            </p>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <Lock style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }} size={26} />
            <h4 style={{ marginBottom: '0.35rem' }}>Stateless JWT &amp; BCrypt</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Spring Security 6 stateless filter chain with JJWT 0.12 cryptographic verification and password hashing.
            </p>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <Cpu style={{ color: 'var(--accent-emerald)', marginBottom: '0.75rem' }} size={26} />
            <h4 style={{ marginBottom: '0.35rem' }}>PostgreSQL 16 &amp; Flyway</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Versioned relational migrations with indexed foreign keys, constraints, and audit timestamps.
            </p>
          </Card>

          <Card style={{ padding: '1.5rem' }}>
            <Activity style={{ color: 'var(--accent-amber)', marginBottom: '0.75rem' }} size={26} />
            <h4 style={{ marginBottom: '0.35rem' }}>Modern React 19 &amp; Vite</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Fast Vite build system, centralized Axios interceptors, responsive design system, and route protection.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
