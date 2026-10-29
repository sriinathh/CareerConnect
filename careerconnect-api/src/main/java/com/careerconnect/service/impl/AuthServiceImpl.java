package com.careerconnect.service.impl;

import com.careerconnect.dto.request.LoginRequest;
import com.careerconnect.dto.request.RegisterRequest;
import com.careerconnect.dto.response.AuthResponse;
import com.careerconnect.dto.response.UserSummaryResponse;
import com.careerconnect.entity.RecruiterProfile;
import com.careerconnect.entity.Role;
import com.careerconnect.entity.StudentProfile;
import com.careerconnect.entity.User;
import com.careerconnect.exception.BadRequestException;
import com.careerconnect.exception.ResourceNotFoundException;
import com.careerconnect.repository.RecruiterProfileRepository;
import com.careerconnect.repository.RoleRepository;
import com.careerconnect.repository.StudentProfileRepository;
import com.careerconnect.repository.UserRepository;
import com.careerconnect.security.JwtTokenProvider;
import com.careerconnect.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final long jwtExpirationMs;

    public AuthServiceImpl(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            RoleRepository roleRepository,
            StudentProfileRepository studentProfileRepository,
            RecruiterProfileRepository recruiterProfileRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            @Value("${app.jwt.expiration-ms:86400000}") long jwtExpirationMs) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.jwtExpirationMs = jwtExpirationMs;
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail().toLowerCase().trim(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        UserSummaryResponse userSummary = mapToUserSummary(user);

        return new AuthResponse(jwt, jwtExpirationMs, userSummary);
    }

    @Override
    @Transactional
    public UserSummaryResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase().trim();

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("An account with email " + email + " already exists");
        }

        User user = new User(
                email,
                passwordEncoder.encode(request.getPassword()),
                request.getFirstName().trim(),
                request.getLastName().trim(),
                request.getPhoneNumber() != null ? request.getPhoneNumber().trim() : null
        );

        // Determine Role (Default: ROLE_STUDENT)
        String roleName = request.getRole() != null && request.getRole().toUpperCase().contains("RECRUITER")
                ? "ROLE_RECRUITER" : "ROLE_STUDENT";

        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(new Role(roleName, "Auto-created role")));

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        // Auto-provision initial profile skeleton
        if ("ROLE_STUDENT".equals(roleName)) {
            StudentProfile profile = new StudentProfile(
                    savedUser,
                    "STU-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(),
                    "Computer Science",
                    2026,
                    8.5
            );
            studentProfileRepository.save(profile);
        } else if ("ROLE_RECRUITER".equals(roleName)) {
            RecruiterProfile profile = new RecruiterProfile(
                    savedUser,
                    "Pending Company",
                    "Talent Lead",
                    "Bengaluru"
            );
            recruiterProfileRepository.save(profile);
        }

        return mapToUserSummary(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserSummaryResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return mapToUserSummary(user);
    }

    private UserSummaryResponse mapToUserSummary(User user) {
        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .toList();

        return new UserSummaryResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                roleNames
        );
    }
}
