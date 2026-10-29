package com.careerconnect.repository;

import com.careerconnect.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {
    Page<Job> findByStatus(String status, Pageable pageable);
    Page<Job> findByRecruiterId(UUID recruiterId, Pageable pageable);
}
