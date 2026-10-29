package com.careerconnect.service;

import com.careerconnect.dto.request.LoginRequest;
import com.careerconnect.dto.request.RegisterRequest;
import com.careerconnect.dto.response.AuthResponse;
import com.careerconnect.dto.response.UserSummaryResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    UserSummaryResponse register(RegisterRequest request);
    UserSummaryResponse getCurrentUser(String email);
}
