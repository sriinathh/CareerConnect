package com.careerconnect.controller;

import com.careerconnect.dto.request.LoginRequest;
import com.careerconnect.dto.request.RegisterRequest;
import com.careerconnect.dto.response.ApiResponse;
import com.careerconnect.dto.response.AuthResponse;
import com.careerconnect.dto.response.UserSummaryResponse;
import com.careerconnect.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication REST Controller managing login, registration, and user identity endpoints.
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Authentication successful", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> register(@Valid @RequestBody RegisterRequest request) {
        UserSummaryResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Account created successfully", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserSummaryResponse response = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("User principal retrieved", response));
    }
}
