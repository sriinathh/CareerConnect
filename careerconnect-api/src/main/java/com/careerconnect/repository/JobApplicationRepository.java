package com.careerconnect.repository;

import com.careerconnect.entity.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
    Page<JobApplication> findByJobId(UUID jobId, Pageable pageable);
    Page<JobApplication> findByStudentId(UUID studentId, Pageable pageable);
    boolean existsByJobIdAndStudentId(UUID jobId, UUID studentId);
}
