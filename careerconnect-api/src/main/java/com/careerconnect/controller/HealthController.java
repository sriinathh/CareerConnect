package com.careerconnect.controller;

import com.careerconnect.dto.response.ApiResponse;
import com.careerconnect.dto.response.HealthResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Health & Diagnostics REST Controller.
 * Provides public endpoint to verify backend operational readiness.
 */
@RestController
@RequestMapping("/api/v1")
public class HealthController {

    private final Environment environment;
    private final String appName;

    public HealthController(
            Environment environment,
            @Value("${spring.application.name:careerconnect-api}") String appName) {
        this.environment = environment;
        this.appName = appName;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<HealthResponse>> getHealthStatus() {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("javaVersion", System.getProperty("java.version"));
        details.put("jvmVendor", System.getProperty("java.vendor"));
        details.put("activeProfiles", environment.getActiveProfiles());
        details.put("systemTime", Instant.now().toString());

        HealthResponse healthResponse = new HealthResponse(
                "UP",
                appName,
                "1.0.0-SNAPSHOT",
                environment.getActiveProfiles().length > 0 ? environment.getActiveProfiles()[0] : "default",
                details
        );

        return ResponseEntity.ok(ApiResponse.success("CareerConnect API service is healthy and operational", healthResponse));
    }
}
