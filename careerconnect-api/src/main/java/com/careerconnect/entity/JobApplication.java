package com.careerconnect.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

/**
 * JobApplication Entity tracking candidate application state across the hiring workflow.
 */
@Entity
@Table(name = "job_applications", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"job_id", "student_id"})
})
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(nullable = false, length = 50)
    private String status = "APPLIED";

    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;

    @Column(name = "recruiter_feedback", columnDefinition = "TEXT")
    private String recruiterFeedback;

    @Column(name = "applied_at", nullable = false, updatable = false)
    private Instant appliedAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public JobApplication() {}

    public JobApplication(Job job, StudentProfile student, String coverLetter) {
        this.job = job;
        this.student = student;
        this.coverLetter = coverLetter;
        this.status = "APPLIED";
        this.appliedAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public StudentProfile getStudent() {
        return student;
    }

    public void setStudent(StudentProfile student) {
        this.student = student;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getRecruiterFeedback() {
        return recruiterFeedback;
    }

    public void setRecruiterFeedback(String recruiterFeedback) {
        this.recruiterFeedback = recruiterFeedback;
    }

    public Instant getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(Instant appliedAt) {
        this.appliedAt = appliedAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
