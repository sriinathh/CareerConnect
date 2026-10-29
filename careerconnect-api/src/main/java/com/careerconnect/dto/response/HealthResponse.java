package com.careerconnect.dto.response;

import java.time.Instant;
import java.util.Map;

/**
 * Payload returned by the /api/v1/health endpoint to verify API runtime status.
 */
public class HealthResponse {

    private String status;
    private String application;
    private String version;
    private String environment;
    private Instant timestamp;
    private Map<String, Object> details;

    public HealthResponse() {
        this.timestamp = Instant.now();
    }

    public HealthResponse(String status, String application, String version, String environment, Map<String, Object> details) {
        this.status = status;
        this.application = application;
        this.version = version;
        this.environment = environment;
        this.timestamp = Instant.now();
        this.details = details;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getDetails() {
        return details;
    }

    public void setDetails(Map<String, Object> details) {
        this.details = details;
    }
}
