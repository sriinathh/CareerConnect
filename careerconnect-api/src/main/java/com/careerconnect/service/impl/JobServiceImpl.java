package com.careerconnect.service.impl;

import com.careerconnect.dto.response.JobResponse;
import com.careerconnect.entity.Job;
import com.careerconnect.exception.ResourceNotFoundException;
import com.careerconnect.repository.JobRepository;
import com.careerconnect.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<JobResponse> getActiveJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return jobRepository.findByStatus("ACTIVE", pageable)
                .map(this::mapToJobResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public JobResponse getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        return mapToJobResponse(job);
    }

    private JobResponse mapToJobResponse(Job job) {
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setCompanyName(job.getRecruiter() != null ? job.getRecruiter().getCompanyName() : "Employer");
        response.setCompanyLogoUrl(job.getRecruiter() != null ? job.getRecruiter().getCompanyLogoUrl() : null);
        response.setEmploymentType(job.getEmploymentType());
        response.setWorkplaceType(job.getWorkplaceType());
        response.setLocation(job.getLocation());
        response.setSalaryMin(job.getSalaryMin());
        response.setSalaryMax(job.getSalaryMax());
        response.setSalaryCurrency(job.getSalaryCurrency());
        response.setRequiredSkills(job.getRequiredSkills());
        response.setApplicationDeadline(job.getApplicationDeadline());
        response.setTotalOpenings(job.getTotalOpenings());
        response.setStatus(job.getStatus());
        response.setCreatedAt(job.getCreatedAt());
        return response;
    }
}
