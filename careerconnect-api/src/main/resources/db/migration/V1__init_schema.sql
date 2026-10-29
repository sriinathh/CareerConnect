-- =============================================================================
-- CareerConnect V1 Schema Migration
-- Managed by Flyway for PostgreSQL 16
-- =============================================================================

-- Ensure pgcrypto extension is available for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_email_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3. USER_ROLES (Many-to-Many Join Table)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- 4. STUDENT PROFILES TABLE
CREATE TABLE IF NOT EXISTS student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    usn_or_roll_number VARCHAR(50) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    graduation_year INT NOT NULL,
    cgpa NUMERIC(4, 2) NOT NULL,
    bio TEXT,
    skills TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_student_cgpa CHECK (cgpa >= 0.0 AND cgpa <= 10.0)
);

CREATE INDEX IF NOT EXISTS idx_student_dept ON student_profiles(department);
CREATE INDEX IF NOT EXISTS idx_student_grad_year ON student_profiles(graduation_year);

-- 5. RECRUITER / COMPANY PROFILES TABLE
CREATE TABLE IF NOT EXISTS recruiter_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    company_name VARCHAR(200) NOT NULL,
    company_website VARCHAR(255),
    company_logo_url VARCHAR(255),
    designation VARCHAR(100) NOT NULL,
    company_description TEXT,
    industry VARCHAR(100),
    location VARCHAR(150),
    verification_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recruiter_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_recruiter_verified_by FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT chk_recruiter_status CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED'))
);

CREATE INDEX IF NOT EXISTS idx_recruiter_company ON recruiter_profiles(company_name);
CREATE INDEX IF NOT EXISTS idx_recruiter_status ON recruiter_profiles(verification_status);

-- 6. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    employment_type VARCHAR(50) NOT NULL,
    experience_level VARCHAR(50),
    workplace_type VARCHAR(50) NOT NULL DEFAULT 'ON_SITE',
    location VARCHAR(150) NOT NULL,
    salary_min NUMERIC(12, 2),
    salary_max NUMERIC(12, 2),
    salary_currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    required_skills TEXT,
    application_deadline DATE,
    total_openings INT NOT NULL DEFAULT 1,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_job_recruiter FOREIGN KEY (recruiter_id) REFERENCES recruiter_profiles(id) ON DELETE CASCADE,
    CONSTRAINT chk_job_status CHECK (status IN ('DRAFT', 'ACTIVE', 'CLOSED', 'ARCHIVED'))
);

CREATE INDEX IF NOT EXISTS idx_jobs_status_created ON jobs(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_title_location ON jobs(title, location);

-- 7. RESUMES TABLE (Metadata Only - Files stored on storage system)
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_extension VARCHAR(10) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resume_student FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_resumes_student ON resumes(student_id);

-- 8. JOB APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL,
    student_id UUID NOT NULL,
    resume_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'APPLIED',
    cover_letter TEXT,
    recruiter_feedback TEXT,
    applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_job_student_application UNIQUE (job_id, student_id),
    CONSTRAINT fk_app_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_app_student FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_app_resume FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE RESTRICT,
    CONSTRAINT chk_app_status CHECK (status IN ('APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED', 'WITHDRAWN'))
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON job_applications(job_id, status);
CREATE INDEX IF NOT EXISTS idx_applications_student ON job_applications(student_id);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    target_url VARCHAR(255),
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- 10. PRE-SEED BASE ROLES
INSERT INTO roles (name, description) VALUES
    ('ROLE_STUDENT', 'Enrolled student eligible to apply for jobs and manage placement profile'),
    ('ROLE_RECRUITER', 'Verified recruiter or corporate employer publishing jobs and evaluating candidates'),
    ('ROLE_ADMIN', 'Placement cell officer or platform administrator with governance privileges')
ON CONFLICT (name) DO NOTHING;
