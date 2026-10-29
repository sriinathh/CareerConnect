package com.careerconnect.controller;

import com.careerconnect.dto.response.ApiResponse;
import com.careerconnect.dto.response.JobResponse;
import com.careerconnect.service.JobService;
import com.careerconnect.util.AppConstants;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Public Job Listings REST Controller with pagination.
 */
@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<JobResponse>>> getActiveJobs(
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        Page<JobResponse> jobs = jobService.getActiveJobs(page, size);
        return ResponseEntity.ok(ApiResponse.success("Active job listings retrieved", jobs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobById(@PathVariable UUID id) {
        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success("Job details retrieved", job));
    }
}
