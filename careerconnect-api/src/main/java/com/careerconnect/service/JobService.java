package com.careerconnect.service;

import com.careerconnect.dto.response.JobResponse;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface JobService {
    Page<JobResponse> getActiveJobs(int page, int size);
    JobResponse getJobById(UUID id);
}
